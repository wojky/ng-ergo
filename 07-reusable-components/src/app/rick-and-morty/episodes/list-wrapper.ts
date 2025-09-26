import { Component, input, Resource } from '@angular/core';
import { ApiListInfoSchema } from '../../shared/contracts/list-api-response';
import { NgComponentOutlet } from '@angular/common';

@Component({
  selector: 'app-list-wrapper',
  imports: [NgComponentOutlet],
  template: `
    @if (resource().hasValue() && resource().value(); as response) {
      @for (x of response.results; track x.id) {
        <li>
          <ng-container
            *ngComponentOutlet="
              itemComponent();
              inputs: {
                item: x,
              }
            "
          />
        </li>
      } @empty {
        <p>This list is empty</p>
      }
    } @else if (resource().isLoading()) {
      <ng-content select="[loadingContent]">
        <p>Loading...</p>
      </ng-content>
    } @else if (resource().error(); as error) {
      <ng-content select="[errorContent]"> Error!</ng-content>
    }
  `,
})
export class ListWrapper<T extends { id: number }> {
  itemComponent = input.required<any>();
  resource = input.required<Resource<{ info: ApiListInfoSchema; results: T[] } | undefined>>();
}
