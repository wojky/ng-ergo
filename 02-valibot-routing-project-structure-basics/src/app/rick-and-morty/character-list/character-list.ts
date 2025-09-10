import { httpResource } from '@angular/common/http';
import { Component, signal } from '@angular/core';
import { BaseSchema, InferOutput, safeParse } from 'valibot';
import { CharacterApiResponse, CharacterApiResponseSchema } from './character.contract';

// todo: add generic type
// export function validate<T extends BaseSchema<unknown, unknown, unknown>>(schema: T) {
//   return (response: unknown) => {
//         const result = safeParse(schema, response);

//         if (result.success) {
//           return result.output;
//         } else {
//           console.log('Validation errors:', result.issues);
//           return response as InferOutput<T>;
//         }
//       }
// }

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

  charactersResource = httpResource(
    () => {
      return {
        method: 'GET',
        url: 'https://rickandmortyapi.com/api/character',
        params: {
          name: this.name(),
        },
      };
    },
    {
      // parse: validate<CharacterApiResponse>(CharacterApiResponseSchema),
      parse: (response) => {
        const result = safeParse(CharacterApiResponseSchema, response);

        if (result.success) {
          return result.output;
        } else {
          console.error('Validation errors:', result.issues);
          return response as CharacterApiResponse;
        }
      },
    },
  );
}
