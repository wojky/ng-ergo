import { Component, effect, inject, input, signal } from '@angular/core';
import { CharacterItem } from './character-item/character-item';
import { Filters, FiltersState } from '../../shared/ui/filters';
import { ExampleService } from '../service-example';
import { CharactersApiService } from './characters.api.service';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import { ListWrapper } from '../../shared/ui/list-wrapper';
import { Pagination } from '../../shared/ui/pagination';

@Component({
  selector: 'app-character-list',
  imports: [CharacterItem, Filters, ListWrapper, Pagination, RouterOutlet],
  providers: [ExampleService],
  template: `
    <button (click)="goToCharacterForm()">Create new character</button>
    <app-filters (newSearch)="search($event)" />
    @if (charactersResource.hasValue() && charactersResource.value(); as data) {
      <app-pagination
        [currentPage]="service.filters().page"
        [totalPages]="data.info.pages"
        (pageChange)="onPageChange($event)"
      />
    }
    <div style="display: flex">
      <div style="display: flex; gap: 16px; flex-wrap: wrap">
        <app-list-wrapper [resource]="charactersResource">
          <ng-template #itemTemplate let-item="item">
            <app-character-item [item]="item" />
          </ng-template>
        </app-list-wrapper>
      </div>
      <router-outlet />
    </div>
  `,
  styles: ``,
})
export class CharacterList {
  service = inject(CharactersApiService);
  router = inject(Router);
  route = inject(ActivatedRoute);

  value = input.required<string>();

  parentModel = signal('from parent');

  search(filters: FiltersState) {
    this.service.updateFilters({ name: filters.name });
  }

  onPageChange(page: number) {
    this.service.updateFilters({ page });
  }

  protected charactersResource = this.service.charactersResource;

  constructor() {
    effect(() => {
      console.log('Value', this.value());
    });

    if (this.charactersResource.status() === 'resolved') {
      this.service.refresh();
    }
  }

  goToCharacterForm() {
    this.router.navigate(['create'], { relativeTo: this.route });
  }
}
