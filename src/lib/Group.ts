import { u } from "unist-builder";
import { z } from "zod";
import { Child } from "./Child";

export type Group = {
  type: "group";
  label: string;
  children: Child[];
};

export const Group: z.ZodSchema<Group> = z.lazy(() =>
  z.object({
    type: z.literal("group"),
    label: z.string(),
    children: z.array(Child),
  })
);

export function isGroup(data: any): data is Group {
  return Group.safeParse(data).success;
}

export const group = (label: string, children: Child[]): Group => {
  return u("group", { label }, children);
};
