import { u } from "unist-builder";
import { z } from "zod";
import { Child } from "./Child";

export type Root = z.infer<typeof Root>;

export const Root = z.object({
  type: z.literal("root"),
  children: z.array(Child),
});

export function isRoot(data: any): data is Root {
  return Root.safeParse(data).success;
}

export const root = (children: Child[]): Root => {
  return u("root", children);
};
