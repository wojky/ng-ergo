import { array, InferOutput, nullable, number, object, string } from 'valibot';

export const ListInfoSchema = object({
  count: number(),
  pages: number(),
  next: nullable(string()),
  prev: nullable(string()),
});

export const CharacterSchema = object({
  id: number(),
  name: string(),
  episode: array(string()),
  status: string(),
  species: string(),
  type: string(),
  gender: string(),
  created: string(),
  location: object({
    name: string(),
    url: string(),
  }),
  url: string(),
  image: string(),
  origin: object({
    name: string(),
    url: string(),
  }),
});

export const CharacterApiResponseSchema = object({
  info: ListInfoSchema,
  results: array(CharacterSchema),
});

export type CharacterApiResponse = InferOutput<typeof CharacterApiResponseSchema>;
export type Character = InferOutput<typeof CharacterSchema>;
