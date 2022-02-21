import { u } from "unist-builder";
import { z } from "zod";
import { Child } from "./Child";

export type Series = {
  type: "series";
  label: string;
  children: Child[];
};

export const Series: z.ZodSchema<Series> = z.lazy(() =>
  z.object({
    type: z.literal("series"),
    label: z.string(),
    children: z.array(Child),
  })
);

export function isSeries(data: any): data is Series {
  return Series.safeParse(data).success;
}

export const series = (label: string, children: Child[]): Series => {
  return u("series", { label }, children);
};
