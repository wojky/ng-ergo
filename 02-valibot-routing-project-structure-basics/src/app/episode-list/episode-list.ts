import { httpResource } from '@angular/common/http';
import { Component, signal } from '@angular/core';

export type ApiResponse = {
  info: {
    count: number;
    next: string | null;
    pages: number;
    prev: string | null;
  };
  results: Episode[];
};

export type Episode = {
  id: number;
  name: string;
};

@Component({
  selector: 'app-episode-list',
  imports: [],
  template: `
    <ul>
      @if (episodesResource.hasValue() && episodesResource.value(); as response) {
        @for (episode of response.results; track episode.id) {
          <li>{{ episode.name }} {{ $even }} {{ $odd }}</li>
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

  episodesResource = httpResource<ApiResponse>(() => {
    return {
      method: 'GET',
      url: 'https://rickandmortyapi.com/api/episode',
      params: {
        name: this.name(),
      },
    };
  });
}
