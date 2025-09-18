import { httpResource } from '@angular/common/http';
import { Component, signal } from '@angular/core';
import { Filters, FiltersState } from '../../shared/ui/filters';
import { LocationItemComponent } from './location-item';
import { LocationApiResponseSchema } from './location.contract';
import { validate } from '../../shared/validate';

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
  imports: [Filters, LocationItemComponent],
  template: `
    <app-filters (newSearch)="search($event)" />
    <ol start="1">
      @if (locationsResource.hasValue() && locationsResource.value(); as response) {
        @for (location of response.results; track location.id) {
          <li>
            <app-location-item [item]="location" />
          </li>
        } @empty {
          <p>This list is empty</p>
        }
      } @else if (locationsResource.isLoading()) {
        <p>Loading...</p>
      } @else if (locationsResource.error(); as error) {
        <p>Error!</p>
      }
    </ol>
  `,
  styles: `
    ol {
      list-style: decimal inside;
    }
  `,
})
export class LocationList {
  name = signal('');

  search(filters: FiltersState) {
    this.name.set(filters.name);
  }

  locationsResource = httpResource(
    () => {
      return {
        method: 'GET',
        url: 'https://rickandmortyapi.com/api/location',
        params: {
          name: this.name(),
        },
      };
    },
    {
      parse: validate(LocationApiResponseSchema, 'https://rickandmortyapi.com/api/location'),
    },
  );
}
