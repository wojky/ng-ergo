import {
  Component,
  contentChild,
  input,
  InputSignal,
  Resource,
  TemplateRef,
  Type,
} from '@angular/core';
import { ApiListInfoSchema } from '../../shared/contracts/list-api-response';
import { NgComponentOutlet, NgTemplateOutlet } from '@angular/common';

@Component({
  selector: 'app-list-wrapper',
  imports: [NgComponentOutlet, NgTemplateOutlet],
  template: `
    @if (resource().hasValue() && resource().value(); as response) {
      @for (item of response.results; track item.id) {
        @if (itemComponent(); as component) {
          <ng-container *ngComponentOutlet="component; inputs: { item: item }" />
        } @else {
          <ng-container
            *ngTemplateOutlet="
              itemTemplate();
              context: {
                item: item,
              }
            "
          />
        }
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
  itemComponent = input<Type<{ item: InputSignal<T> }>>();
  resource = input.required<Resource<{ info: ApiListInfoSchema; results: T[] } | undefined>>();

  itemTemplate = contentChild.required<TemplateRef<{ item: T }>>('itemTemplate');
}
