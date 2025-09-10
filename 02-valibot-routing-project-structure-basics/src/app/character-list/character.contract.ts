import { array, InferOutput, nullable, number, object, string } from 'valibot';

export const CharacterApiResponseSchema = object({
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
      image: string(),
    }),
  ),
});

export type CharacterApiResponse = InferOutput<typeof CharacterApiResponseSchema>;
export type Character = CharacterApiResponse['results'][number];
