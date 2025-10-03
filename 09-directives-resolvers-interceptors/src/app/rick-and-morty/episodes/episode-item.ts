import { Component, input } from '@angular/core';
import { Episode } from './episode.contract';

@Component({
  selector: 'app-episode-item',
  template: `
    <div class="episode-item">
      <h3>{{ item().name }}</h3>
      <p>{{ item().episode }}</p>
      <p>{{ item().air_date }}</p>
    </div>
  `,
  styles: [
    `
      .episode-item {
        border: 1px solid #ccc;
        padding: 1rem;
        margin-bottom: 1rem;
        border-radius: 4px;
      }
    `,
  ],
})
export class EpisodeItemComponent {
  item = input.required<Episode>();
}
