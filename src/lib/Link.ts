import { u } from "unist-builder";
import { z } from "zod";

export type Link = z.infer<typeof Link>;

export const Link = z.object({
  type: z.literal("link"),
  label: z.string(),
  url: z.string().url(),
});

export function isLink(data: any): data is Link {
  return Link.safeParse(data).success;
}

export const link = (url: string, label: string): Link => {
  return u("link", { url, label });
};
