import { httpResource } from '@angular/common/http';
import { Component, signal } from '@angular/core';
import { BaseIssue, BaseSchema, InferOutput, safeParse } from 'valibot';
import { CharacterApiResponseSchema } from './character.contract';

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

@Component({
  selector: 'app-character-list',
  imports: [],
  template: `
    <ul>
      @if (charactersResource.hasValue() && charactersResource.value(); as response) {
        @for (character of response.results; track character.id) {
          <li>{{ character.name }}</li>
        } @empty {
          <p>This list is empty</p>
        }
      } @else if (charactersResource.isLoading()) {
        <p>Loading...</p>
      } @else if (charactersResource.error(); as error) {
        <p>Error!</p>
      }
    </ul>
  `,
  styles: ``,
})
export class CharacterList {
  name = signal('');

  readonly url = 'https://rickandmortyapi.com/api/character';

  charactersResource = httpResource(
    () => {
      return {
        method: 'GET',
        url: this.url,
        params: {
          name: this.name(),
        },
      };
    },
    {
      parse: validate(CharacterApiResponseSchema, this.url),
    },
  );
}
