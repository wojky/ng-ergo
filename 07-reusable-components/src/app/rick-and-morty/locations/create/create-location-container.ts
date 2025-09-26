import { httpResource } from '@angular/common/http';
import { Component, inject, signal } from '@angular/core';
import { ReactiveFormsModule, FormControl } from '@angular/forms';
import { readableDateFormat } from '../../../shared/utils/date/readable-date.pipe';
import { validate } from '../../../shared/validate';
import { CharacterApiResponseSchema, Character } from '../../characters/character.contract';
import { LocationFormService } from './create-location.form.service';
import { LocationsApiService } from '../locations.api.service';

@Component({
  selector: 'app-create-episode-container',
  imports: [ReactiveFormsModule],
  providers: [LocationFormService],
  template: `
    <section>
      <h2>Create location</h2>
      <form [formGroup]="service.createLocationForm">
        <div style="display: flex; flex-direction: column; gap: 1rem;">
          <label>
            Name
            <input formControlName="name" />
          </label>

          <label>
            Type
            <input formControlName="type" />
          </label>

          <label>
            Dimension
            <input formControlName="dimension" />
          </label>

          <div style="display: flex; gap: 2rem;">
            <div>
              <label
                >Character:

                <input #characterInput />
                <button (click)="searchCharacter(characterInput.value)">Search</button>
              </label>
              @if (characterResource.hasValue() && characterResource.value(); as characterData) {
                <ul>
                  @for (character of characterData.results.slice(0, 5); track character.id) {
                    <li>
                      {{ character.name }}
                      <button (click)="selectCharacter(character)">Select</button>
                    </li>
                  }
                </ul>
              }
            </div>
            <div>
              <p>Selected characters:</p>
              <ul>
                @for (
                  character of service.createLocationForm.value.characters;
                  track character.id
                ) {
                  <li>
                    {{ character.name }}
                    <button (click)="removeCharacter($index)">Remove</button>
                  </li>
                }
              </ul>
            </div>
          </div>
        </div>
      </form>
    </section>

    <footer style="display: flex; gap: 1rem">
      <button (click)="submit()">Submit</button>
    </footer>
  `,
  styles: ``,
})
export class CreateLocationContainer {
  service = inject(LocationFormService);
  api = inject(LocationsApiService);

  searchTerm = signal('');

  searchCharacter(searchTerm: string) {
    this.searchTerm.set(searchTerm);
  }

  characterResource = httpResource(
    () => {
      return {
        method: 'GET',
        url: `https://rickandmortyapi.com/api/character`,
        params: {
          name: this.searchTerm(),
        },
      };
    },
    {
      parse: validate(CharacterApiResponseSchema, `https://rickandmortyapi.com/api/character`),
    },
  );

  selectCharacter(character: Character) {
    this.service.createLocationForm.controls.characters.push(
      new FormControl(character, { nonNullable: true }),
    );
  }

  removeCharacter(index: number) {
    this.service.createLocationForm.controls.characters.removeAt(index);
  }

  submit() {
    if (this.service.createLocationForm.valid) {
      const { name, type, dimension, characters } = this.service.createLocationForm.getRawValue();
      this.api.createLocation({
        name: name,
        type: type,
        dimension: dimension,
        residents: characters.map((character) => character.url),
      });

      console.log('Form value:', this.service.createLocationForm.value);

      alert('Location created!');
      this.service.createLocationForm.reset();
    }
  }
}
