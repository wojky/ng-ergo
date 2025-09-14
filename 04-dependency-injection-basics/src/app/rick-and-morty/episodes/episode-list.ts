import { httpResource } from '@angular/common/http';
import { Component, signal } from '@angular/core';
import { EpisodeItemComponent } from './episode-item';
import { validate } from '../../shared/validate';
import { EpisodeApiResponseSchema } from './episode.contract';
import { Filters, FiltersState } from '../../shared/ui/filters';

@Component({
  selector: 'app-episode-list',
  imports: [EpisodeItemComponent, Filters],
  template: `
    <app-filters (newSearch)="name.set($event.name)" />
    <ul>
      @if (episodesResource.hasValue() && episodesResource.value(); as response) {
        @for (episode of response.results; track episode.id) {
          <li>
            <app-episode-item [item]="episode" />
          </li>
        } @empty {
          <p>This list is empty</p>
        }
      } @else if (episodesResource.isLoading()) {
        <p>Loading...</p>
      } @else if (episodesResource.error(); as error) {
        <p>Error!</p>
      }
    </ul>
  `,
  styles: ``,
})
export class EpisodeList {
  name = signal('');

  search(filters: FiltersState) {
    this.name.set(filters.name);
  }

  episodesResource = httpResource(
    () => {
      return {
        method: 'GET',
        url: 'https://rickandmortyapi.com/api/episode',
        params: {
          name: this.name(),
        },
      };
    },
    {
      parse: validate(EpisodeApiResponseSchema, 'https://rickandmortyapi.com/api/episode'),
    },
  );
}
