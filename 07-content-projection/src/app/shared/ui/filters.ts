import { Component, output, signal } from '@angular/core';

export type FiltersState = {
  name: string;
};

@Component({
  selector: 'app-filters',
  template: `
    <div style="display: flex; gap: 8px; align-items: center;">
      <div>
        <input (input)="name.set($event.target.value)" placeholder="Search by name" />
      </div>
      <button (click)="search()">Search</button>
    </div>
  `,
})
export class Filters {
  newSearch = output<FiltersState>();
  name = signal('');

  search() {
    this.newSearch.emit({ name: this.name() });
  }
}
