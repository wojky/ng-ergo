import { Component, input } from '@angular/core';
import { Episode } from './episode.contract';
import { CopyToClipboardDirective } from '../../shared/utils/directives/copy-to-clipboard.directive';

@Component({
  selector: 'app-episode-item',
  imports: [CopyToClipboardDirective],
  template: `
    <div class="episode-item">
      <h3>{{ item().name }}</h3>
      <p appCopyToClipboard>{{ item().episode }}</p>
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
