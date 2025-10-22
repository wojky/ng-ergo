import { Component, output, signal } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatAnchor, MatButtonModule } from '@angular/material/button';

export type FiltersState = {
  name: string;
};

@Component({
  selector: 'app-filters',
  imports: [MatInputModule, MatFormFieldModule, MatButtonModule],
  template: `
    <div style="display: flex; gap: 8px; align-items: center">
      <mat-form-field>
        <mat-label>Characters</mat-label>
        <input matInput (input)="name.set($event.target.value)" placeholder="Search by name" />
      </mat-form-field>

      <button matButton="filled" (click)="search()">Search</button>
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
