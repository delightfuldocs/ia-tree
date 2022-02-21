import { u } from "unist-builder";
import { z } from "zod";
import { Child } from "./Child";

export type Page = {
  type: "page";
  id: string;
  label: string;
  children?: Child[];
};

export const Page: z.ZodSchema<Page> = z.lazy(() =>
  z.object({
    type: z.literal("page"),
    id: z.string(),
    label: z.string(),
    children: z.array(Child).optional(),
  })
);

export function isPage(data: any): data is Page {
  return Page.safeParse(data).success;
}

export const page = (id: string, label: string, children?: Child[]): Page => {
  if (!children || !Array.isArray(children) || children.length < 1) {
    return u("page", { id, label });
  }

  return u("page", { id, label }, children);
};
