import { z } from "zod";
import { Page } from "./Page";
import { Group } from "./Group";
import { Section } from "./Section";
import { Link } from "./Link";

export type Child = z.infer<typeof Child>;

export const Child = Page.or(Group).or(Section).or(Link);

export function isChild(data: any): data is Child {
  return Child.safeParse(data).success;
}
