import { array, InferOutput, nullable, number, object, string } from 'valibot';
import { ApiListInfoSchema } from '../../shared/contracts/list-api-response';

export const EpisodeSchema = object({
  id: number(),
  name: string(),
  air_date: string(),
  episode: string(),
  created: string(),
  url: string(),
  characters: array(string()),
});

export const EpisodeApiResponseSchema = object({
  info: ApiListInfoSchema,
  results: array(EpisodeSchema),
});

export const CreateEpisodeFormValueSchema = object({
  name: string(),
  air_date: string(), // format YYYY-MM-DD
  episode: string(), // format SxxExx
});

export type EpisodeApiResponse = InferOutput<typeof EpisodeApiResponseSchema>;
export type Episode = InferOutput<typeof EpisodeSchema>;
export type CreateEpisodeFormValue = InferOutput<typeof CreateEpisodeFormValueSchema>;
