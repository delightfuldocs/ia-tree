import { u } from "unist-builder";
import { z } from "zod";
import { Child } from "./Child";
import { visitParents } from "unist-util-visit-parents";
import { Root } from "./Root";
import { isPage } from "./Page";

export type Section = {
  type: "section";
  id: string;
  label: string;
  children: Child[];
};

export const Section: z.ZodSchema<Section> = z.lazy(() =>
  z.object({
    type: z.literal("section"),
    id: z.string(),
    label: z.string(),
    children: z.array(Child),
  })
);

export function isSection(data: any): data is Section {
  return Section.safeParse(data).success;
}

/**
 * Creates a Section node.
 * @param id The ID of a document.
 * @param label A human readable label for the section.
 * @param children The nodes that exist within the section.
 * @returns A Section node.
 */
export const section = (
  id: string,
  label: string,
  children: Child[]
): Section => {
  return u("section", { id, label }, children);
};

export const getSection = (tree: Root, id: string): Section | undefined => {
  let result: Section | Root | undefined = undefined;

  visitParents(tree, (node, ancestors) => {
    // If a result has been found, stop searching!
    if (result) {
      return;
    }

    // If the ID belongs to a Section, return the Section
    if (isSection(node) && node.id === id) {
      result = node;
      return;
    }

    // Otherwise, search the ancestors for the nearest Section
    if (isPage(node) && node.id === id) {
      ancestors.reverse().forEach((ancestor) => {
        if (isSection(ancestor)) {
          result = ancestor;
          return;
        }
      });
    }
  });

  // Return the Section, or if a Section wasn't found, the Root
  return result;
};

export const getSectionParent = (
  tree: Root,
  sectionId: string
): Section | undefined => {
  const section = getSection(tree, sectionId);

  if (!section) {
    return;
  }

  let result: Section | Root | undefined = undefined;

  visitParents(tree, (node, ancestors) => {
    if (isSection(node) && node.id === section.id) {
      ancestors.reverse().forEach((ancestor) => {
        if (isSection(ancestor)) {
          result = ancestor;
          return;
        }
      });
    }
  });

  return result;
};
