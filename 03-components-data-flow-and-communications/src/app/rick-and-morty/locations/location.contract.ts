import { array, InferOutput, nullable, number, object, string } from 'valibot';

export const LocationApiResponseSchema = object({
  info: object({
    count: number(),
    pages: number(),
    next: nullable(string()),
    prev: nullable(string()),
  }),
  results: array(
    object({
      id: number(),
      name: string(),
      type: string(),
      dimension: string(),
      created: string(),
      url: string(),
      residents: array(string()),
    }),
  ),
});

export type LocationApiResponse = InferOutput<typeof LocationApiResponseSchema>;
export type Location = LocationApiResponse['results'][number];
