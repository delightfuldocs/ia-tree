import { visitParents } from "unist-util-visit-parents";
import { Root } from "./Root";
import { isSection, Section } from "./Section";
import { isPage, Page } from "./Page";

type Breadcrumb = {
  type: "section" | "page";
  id: string;
  label: string;
};

export const getBreadcrumbs = (tree: Root, id: string) => {
  const breadcrumbs: Breadcrumb[] = [];

  visitParents(tree, (node, ancestors) => {
    if (isPageOrSection(node) && node.id === id) {
      // Add ancestors as breadcrumbs
      ancestors.reverse().forEach((ancestor) => {
        if (isPageOrSection(ancestor)) {
          const { type, id, label } = ancestor;
          breadcrumbs.push({
            type,
            id,
            label,
          });
        }
      });

      // Add the current page as the last breadcrumb
      breadcrumbs.push(node);
    }
  });

  return breadcrumbs;
};

function isPageOrSection(data: any): data is Page | Section {
  return isPage(data) || isSection(data);
}
