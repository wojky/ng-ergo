import { Component, inject, signal } from '@angular/core';
import { CharacterItem, CharacterItemChildMessagePayload } from './character-item/character-item';
import { Filters, FiltersState } from '../../shared/ui/filters';
import { ExampleService } from '../service-example';
import { CharactersApiService } from './characters.api.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-character-list',
  imports: [CharacterItem, Filters],
  providers: [ExampleService],
  template: `
    <button (click)="goToCharacterForm()">Create new character</button>
    <app-filters (newSearch)="search($event)" />
    <div style="display: flex; gap: 16px; flex-wrap: wrap">
      @if (charactersResource.hasValue() && charactersResource.value(); as response) {
        @for (character of response.results; track character.id) {
          <app-character-item [item]="character" />
        } @empty {
          <p>This list is empty</p>
        }
      } @else if (charactersResource.isLoading()) {
        <p>Loading...</p>
      } @else if (charactersResource.error(); as error) {
        <p>Error!</p>
      }
    </div>
  `,
  styles: ``,
})
export class CharacterList {
  service = inject(CharactersApiService);
  router = inject(Router);
  route = inject(ActivatedRoute);

  parentModel = signal('from parent');

  search(filters: FiltersState) {
    this.service.updateFilters(filters.name);
  }

  onChildMessage(payload: CharacterItemChildMessagePayload) {
    console.log('Message from child:', payload);
  }

  protected charactersResource = this.service.charactersResource;

  constructor() {
    if (this.charactersResource.status() === 'resolved') {
      this.service.refresh();
    }
  }

  goToCharacterForm() {
    this.router.navigate(['create'], { relativeTo: this.route });
  }
}
