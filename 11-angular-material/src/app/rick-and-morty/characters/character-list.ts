import { Component, effect, inject, input, signal } from '@angular/core';
import { CharacterItem } from './character-item/character-item';
import { Filters, FiltersState } from '../../shared/ui/filters';
import { ExampleService } from '../service-example';
import { CharactersApiService } from './characters.api.service';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import { ListWrapper } from '../../shared/ui/list-wrapper';
import { Pagination } from '../../shared/ui/pagination';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-character-list',
  imports: [
    CharacterItem,
    Filters,
    ListWrapper,
    Pagination,
    RouterOutlet,
    MatCheckboxModule,
    ReactiveFormsModule,
  ],
  providers: [ExampleService],
  template: `
    <button (click)="goToCharacterForm()">Create new character</button>
    <app-filters (newSearch)="search($event)">
      <mat-checkbox [formControl]="ctrl">Toggle me</mat-checkbox>

      <input type="checkbox" [formControl]="ctrl" />Toggle me
    </app-filters>
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
  private snackBar = inject(MatSnackBar);

  ctrl = new FormControl(false);

  service = inject(CharactersApiService);
  router = inject(Router);
  route = inject(ActivatedRoute);

  value = input.required<string>();

  parentModel = signal('from parent');

  ngOnInit() {
    const snack = this.snackBar.open('Toast opened!', 'Close', {
      duration: 0,
      horizontalPosition: 'right',
      verticalPosition: 'top',
    });

    snack.afterOpened().subscribe(() => {
      console.log('Toast is opened');
    });

    snack.afterDismissed().subscribe(() => {
      console.log('Toast is dismissed');
    });
  }

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
