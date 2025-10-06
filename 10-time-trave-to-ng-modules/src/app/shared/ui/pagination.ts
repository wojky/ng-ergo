import { Component, computed, input, model, output } from '@angular/core';

@Component({
  selector: 'app-pagination',
  standalone: false,
  template: `
    <div>
      <button (click)="updatePage(currentPage() - 1)" [disabled]="currentPage() === 1">
        Previous
      </button>
      <span>Page {{ currentPage() }} of {{ totalPages() }}</span>
      <button (click)="updatePage(currentPage() + 1)" [disabled]="currentPage() === totalPages()">
        Next
      </button>
    </div>
  `,
})
export class Pagination {
  currentPage = input.required<number>();
  totalPages = input.required<number>();

  pageChange = output<number>();

  updatePage(nextPage: number) {
    this.pageChange.emit(nextPage);
  }
}
