import { Component, inject, Pipe, PipeTransform } from '@angular/core';
import { UpperCasePipe } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { EpisodeFormService } from './create-episode.form.service';
import { EpisodesApiService } from '../episodes.api.service';

export function customDate(date: string): string {
  const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(date).toLocaleDateString('en-US', options);
}

@Pipe({
  name: 'customDate',
})
export class CustomDatePipe implements PipeTransform {
  transform(date: string) {
    return customDate(date);
  }
}

@Component({
  selector: 'app-create-episode-container',
  imports: [ReactiveFormsModule, CustomDatePipe, UpperCasePipe],
  providers: [EpisodeFormService],
  template: `
    <section>
      <h2>Create episode</h2>
      <form [formGroup]="service.createCharacterForm">
        <div style="display: flex; flex-direction: column; gap: 1rem;">
          <label>
            Name
            <input formControlName="name" />
          </label>
          <label>
            Air date
            <input type="date" [max]="service.todayDate" formControlName="air_date" />
            <span>{{
              service.createCharacterForm.getRawValue().air_date | customDate | uppercase
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
                service.createCharacterForm.value.season!,
                service.createCharacterForm.value.episode!
              )
            }}</span>
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

  formatDate(date: string): string {
    return customDate(date);
  }

  submit() {
    if (this.service.createCharacterForm.valid) {
      const { name, air_date, season, episode } = this.service.createCharacterForm.getRawValue();
      this.api.createEpisode({
        name: name,
        air_date: this.formatDate(air_date),
        episode: this.formatEpisodeCode(season, episode),
      });

      console.log('Form value:', this.service.createCharacterForm.value);

      // alert('Episode created!');
      // this.service.createCharacterForm.reset();
    }
  }
}
