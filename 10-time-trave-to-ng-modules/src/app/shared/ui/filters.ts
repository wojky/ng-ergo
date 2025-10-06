import { Component, EventEmitter, Output, output, signal } from '@angular/core';

export type FiltersState = {
  name: string;
};

@Component({
  selector: 'app-filters',
  standalone: false,
  template: `
    <div style="display: flex; gap: 8px; align-items: center;">
      <div>
        <input #input placeholder="Search by name" />
      </div>
      <button (click)="search(input.value)">Search</button>
    </div>
  `,
})
export class Filters {
  @Output() newSearch = new EventEmitter<FiltersState>();

  search(name: string) {
    this.newSearch.emit({ name });
  }
}
