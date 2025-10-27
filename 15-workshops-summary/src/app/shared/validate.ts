import { BaseSchema, BaseIssue, safeParse, InferOutput } from 'valibot';

export function validate<T extends BaseSchema<unknown, unknown, BaseIssue<unknown>>>(
  schema: T,
  url: string,
) {
  return (response: unknown) => {
    const result = safeParse(schema, response);

    if (result.success) {
      return result.output;
    } else {
      result.issues.forEach((issue) => {
        console.error(
          `Validation errors on url ${url}: ${issue.message} at ${issue.path?.reduce((a, b) => `${a}${a.length > 0 ? '.' : ''}${b.key}`, '')}`,
        );
      });

      return response as InferOutput<T>;
    }
  };
}
