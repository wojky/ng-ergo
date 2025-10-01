import { InferOutput, nullable, number, object, string } from 'valibot';

export const ApiListInfoSchema = object({
  count: number(),
  pages: number(),
  next: nullable(string()),
  prev: nullable(string()),
});

export type ApiListInfoSchema = InferOutput<typeof ApiListInfoSchema>;
