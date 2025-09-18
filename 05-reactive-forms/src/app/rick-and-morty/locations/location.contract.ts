import { array, InferOutput, number, object, string } from 'valibot';
import { ApiListInfoSchema } from '../../shared/contracts/list-api-response';

export const LocationSchema = object({
  id: number(),
  name: string(),
  type: string(),
  dimension: string(),
  created: string(),
  url: string(),
  residents: array(string()),
});

export const LocationApiResponseSchema = object({
  info: ApiListInfoSchema,
  results: array(LocationSchema),
});

export type LocationApiResponse = InferOutput<typeof LocationApiResponseSchema>;
export type Location = InferOutput<typeof LocationSchema>;
