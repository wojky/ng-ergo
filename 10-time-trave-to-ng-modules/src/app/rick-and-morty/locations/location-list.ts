import { Component, inject, signal } from '@angular/core';
import { Filters, FiltersState } from '../../shared/ui/filters';
import { LocationItemComponent } from './location-item';
import { Router, ActivatedRoute } from '@angular/router';
import { LocationsApiService } from './locations.api.service';
import { ListWrapper } from '../../shared/ui/list-wrapper';

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
  standalone: false,
  template: `
    <button (click)="goToLocationForm()">Create new location</button>
    <app-filters (newSearch)="search($event)" />
    <ol start="1">
      <app-list-wrapper [resource]="locationsResource">
        <ng-template #itemTemplate let-item="item">
          <li>
            <app-location-item [item]="item" />
          </li>
        </ng-template>
      </app-list-wrapper>
    </ol>
  `,
  styles: `
    ol {
      list-style: decimal inside;
    }
  `,
})
export class LocationList {
  router = inject(Router);
  route = inject(ActivatedRoute);

  name = signal('');

  service = inject(LocationsApiService);

  search(filters: FiltersState) {
    this.service.updateFilters(filters.name);
  }

  locationsResource = this.service.locationsResource;

  goToLocationForm() {
    this.router.navigate(['create'], { relativeTo: this.route });
  }
}
