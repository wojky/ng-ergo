import { array, InferOutput, nullable, number, object, string } from 'valibot';

export const EpisodeApiResponseSchema = object({
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
      air_date: string(),
      episode: string(),
      created: string(),
      url: string(),
      characters: array(string()),
    }),
  ),
});

export type EpisodeApiResponse = InferOutput<typeof EpisodeApiResponseSchema>;
export type Episode = EpisodeApiResponse['results'][number];
