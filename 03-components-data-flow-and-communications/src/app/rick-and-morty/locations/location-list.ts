import { httpResource } from '@angular/common/http';
import { Component, signal } from '@angular/core';

export type ApiResponse = {
  info: {
    count: number;
    next: string | null;
    pages: number;
    prev: string | null;
  };
  results: Location[];
};

export type Location = {
  id: number;
  name: string;
};

@Component({
  selector: 'app-location-list',
  imports: [],
  template: `
    <ul>
      @if (locationsResource.hasValue() && locationsResource.value(); as response) {
        @for (location of response.results; track location.id) {
          <li>{{ location.name }}</li>
        } @empty {
          <p>This list is empty</p>
        }
      } @else if (locationsResource.isLoading()) {
        <p>Loading...</p>
      } @else if (locationsResource.error(); as error) {
        <p>Error!</p>
      }
    </ul>
  `,
  styles: ``,
})
export class LocationList {
  name = signal('');

  locationsResource = httpResource<ApiResponse>(() => {
    return {
      method: 'GET',
      url: 'https://rickandmortyapi.com/api/location',
      params: {
        name: this.name(),
      },
    };
  });
}
