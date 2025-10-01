import { array, InferOutput, number, object, string } from 'valibot';
import { ApiListInfoSchema } from '../../shared/contracts/list-api-response';

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
  info: ApiListInfoSchema,
  results: array(CharacterSchema),
});

export type CharacterApiResponse = InferOutput<typeof CharacterApiResponseSchema>;
export type Character = InferOutput<typeof CharacterSchema>;
