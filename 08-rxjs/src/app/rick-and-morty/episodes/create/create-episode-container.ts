import { Component, inject, signal } from '@angular/core';
import { UpperCasePipe } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { EpisodeFormService } from './create-episode.form.service';
import { EpisodesApiService } from '../episodes.api.service';
import { validate } from '../../../shared/validate';
import { Character, CharacterApiResponseSchema } from '../../characters/character.contract';
import { httpResource } from '@angular/common/http';
import {
  readableDateFormat,
  ReadableDatePipe,
} from '../../../shared/utils/date/readable-date.pipe';

@Component({
  selector: 'app-create-episode-container',
  imports: [ReactiveFormsModule, ReadableDatePipe, UpperCasePipe],
  providers: [EpisodeFormService],
  template: `
    <section>
      <h2>Create episode</h2>
      <form [formGroup]="service.createEpisodeForm">
        <div style="display: flex; flex-direction: column; gap: 1rem;">
          <label>
            Name
            <input formControlName="name" />
          </label>
          <label>
            Air date
            <input type="date" [max]="service.todayDate" formControlName="air_date" />
            <span>{{
              service.createEpisodeForm.getRawValue().air_date | readableDate | uppercase
            }}</span>
          </label>
          <div>
            <label>
              Season
              <input min="1" formControlName="season" />
            </label>
            <label>
              Episode
              <input min="1" formControlName="episode" />
            </label>
            <span>{{
              formatEpisodeCode(
                service.createEpisodeForm.value.season!,
                service.createEpisodeForm.value.episode!
              )
            }}</span>
          </div>
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
                @for (character of service.createEpisodeForm.value.characters; track character.id) {
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
export class CreateEpisodeContainer {
  service = inject(EpisodeFormService);
  api = inject(EpisodesApiService);

  formatEpisodeCode(season: number, episode: number): string {
    return `S${season.toString().padStart(2, '0')}E${episode.toString().padStart(2, '0')}`;
  }

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
    this.service.createEpisodeForm.controls.characters.push(
      new FormControl(character, { nonNullable: true }),
    );
  }

  removeCharacter(index: number) {
    this.service.createEpisodeForm.controls.characters.removeAt(index);
  }

  submit() {
    if (this.service.createEpisodeForm.valid) {
      const { name, air_date, season, episode, characters } =
        this.service.createEpisodeForm.getRawValue();
      this.api.createEpisode({
        name: name,
        air_date: readableDateFormat(air_date),
        episode: this.formatEpisodeCode(season, episode),
        characters: characters.map((character) => character.url),
      });

      console.log('Form value:', this.service.createEpisodeForm.value);

      alert('Episode created!');
      this.service.createEpisodeForm.reset();
    }
  }
}
