import { Component, input, output } from '@angular/core';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-pagination',
  imports: [MatPaginatorModule],
  template: `
    <mat-paginator
      #paginator
      class="demo-paginator"
      (page)="updatePage($event)"
      [length]="totalPages() * 20"
      [pageSize]="20"
      [disabled]="false"
      [showFirstLastButtons]="true"
      [pageSizeOptions]="[]"
      [hidePageSize]="false"
      [pageIndex]="currentPage() - 1"
      aria-label="Select page"
    >
    </mat-paginator>
  `,
})
export class Pagination {
  currentPage = input.required<number>();
  totalPages = input.required<number>();

  pageChange = output<number>();

  updatePage(nextPage: PageEvent) {
    this.pageChange.emit(nextPage.pageIndex + 1);
  }
}
