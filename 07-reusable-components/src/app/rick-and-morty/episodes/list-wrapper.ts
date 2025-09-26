import { Component, contentChild, input, Resource, TemplateRef } from '@angular/core';
import { ApiListInfoSchema } from '../../shared/contracts/list-api-response';
import { NgComponentOutlet, NgTemplateOutlet } from '@angular/common';

@Component({
  selector: 'app-list-wrapper',
  imports: [NgComponentOutlet, NgTemplateOutlet],
  template: `
    <!-- <ng-template #defaultTemplate let-a="index" let-b="name">
      <p>Test {{ a }} {{ b }}</p>
    </ng-template> -->

    @if (resource().hasValue() && resource().value(); as response) {
      @for (x of response.results; track x.id) {
        <li>
          <ng-container
            *ngTemplateOutlet="
              itemTemplate();
              context: {
                item: x,
              }
            "
          />
          <!-- <ng-container
            *ngComponentOutlet="
              itemComponent();
              inputs: {
                item: x,
              }
            "
          /> -->
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

  itemTemplate = contentChild.required<TemplateRef<{ item: T }>>('itemTemplate');
}
