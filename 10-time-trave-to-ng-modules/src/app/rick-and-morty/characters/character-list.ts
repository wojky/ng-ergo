import { Component, effect, inject, input, signal } from '@angular/core';
import { CharacterItem } from './character-item/character-item';
import { Filters, FiltersState } from '../../shared/ui/filters';
import { ExampleService } from '../service-example';
import { CharactersApiService } from './characters.api.service';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import { ListWrapper } from '../../shared/ui/list-wrapper';
import { Pagination } from '../../shared/ui/pagination';
import { distinctUntilChanged, Observable } from 'rxjs';
import { CharacterApiResponse } from './character.contract';

@Component({
  selector: 'app-character-list',
  standalone: false,
  providers: [ExampleService],
  template: `
    <button (click)="goToCharacterForm()">Create new character</button>
    <app-filters (newSearch)="search($event)" />

    <ng-container *ngIf="service.filters | async as filters">
      <ng-container *ngIf="service.characters | async as chars">
        <app-pagination
          [currentPage]="filters.page"
          [totalPages]="chars.info.pages"
          (pageChange)="onPageChange($event)"
        />

        <div style="display: flex">
          <div
            *ngIf="service.charactersApiState | async as state"
            style="display: flex; gap: 16px; flex-wrap: wrap"
          >
            <app-list-wrapper [items]="chars.results" [listState]="state">
              <ng-template #itemTemplate let-item="item">
                <app-character-item [item]="item" />
              </ng-template>
            </app-list-wrapper>
          </div>
          <router-outlet />
        </div>
      </ng-container>
    </ng-container>
  `,
  styles: ``,
})
export class CharacterList {
  search(filters: FiltersState) {
    this.service.updateFilters({ name: filters.name });
  }

  onPageChange(page: number) {
    this.service.updateFilters({ page });
  }

  protected characters!: Observable<CharacterApiResponse | undefined>;

  constructor(
    public service: CharactersApiService,
    private router: Router,
    private route: ActivatedRoute,
  ) {
    this.characters = this.service.characters;

    this.service.charactersApiState
      .pipe(
        distinctUntilChanged(
          (prev, curr) =>
            prev.hasValue === curr.hasValue &&
            prev.isLoading === curr.isLoading &&
            prev.isError === curr.isError,
        ),
      )
      .subscribe(({ hasValue }) => {
        if (hasValue) {
          this.service.refresh();
        }
      });
  }

  goToCharacterForm() {
    this.router.navigate(['create'], { relativeTo: this.route });
  }
}
