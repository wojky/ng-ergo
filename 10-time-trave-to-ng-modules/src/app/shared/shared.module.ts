import { NgModule } from '@angular/core';
import { Filters } from './ui/filters';
import { Rating } from './ui/rating';
import { DynamicComponent, ListWrapper } from './ui/list-wrapper';
import { Pagination } from './ui/pagination';
import { ReadableDatePipe } from './utils/date/readable-date.pipe';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [CommonModule],
  exports: [Filters, Rating, ListWrapper, DynamicComponent, Pagination, ReadableDatePipe],
  declarations: [Filters, Rating, ListWrapper, DynamicComponent, Pagination, ReadableDatePipe],
})
export class SharedModule {}
