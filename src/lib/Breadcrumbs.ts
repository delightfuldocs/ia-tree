import { visitParents } from "unist-util-visit-parents";
import { Root } from "./Root";
import { Child } from "./Child";
import { isSection, Section } from "./Section";
import { isPage, Page } from "./Page";

export const getBreadcrumbs = (tree: Root, id: string) => {
  const breadcrumbs: Child[] = [];

  visitParents(tree, (node, ancestors) => {
    if (isPageOrSection(node) && node.id === id) {
      // Add ancestors as breadcrumbs
      ancestors.reverse().forEach((ancestor) => {
        if (isPageOrSection(ancestor)) {
          breadcrumbs.push(ancestor);
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
