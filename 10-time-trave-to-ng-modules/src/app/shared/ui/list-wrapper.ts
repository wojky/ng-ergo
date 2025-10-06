import {
  Component,
  ContentChild,
  Input,
  input,
  Resource,
  TemplateRef,
  Type,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { ApiListInfoSchema } from '../../shared/contracts/list-api-response';

@Component({
  selector: 'app-dynamic-component',
  standalone: false,
  template: ` <ng-container #container></ng-container> `,
})
export class DynamicComponent<T> {
  @Input() item!: T;
  @Input() component!: Type<{ item: T }>;

  @ViewChild('container', { read: ViewContainerRef, static: true })
  public componentOutlet!: ViewContainerRef;

  ngAfterViewInit() {
    if (this.component) {
      this.componentOutlet.clear();
      const componentRef = this.componentOutlet.createComponent(this.component);
      componentRef.instance.item = this.item;
    }
  }
}

@Component({
  selector: 'app-list-wrapper',
  standalone: false,
  template: `
    <ng-container *ngIf="listState.hasValue">
      <ng-container *ngIf="items.length; else emptyList">
        <ng-container *ngFor="let item of items">
          <ng-container *ngIf="itemComponent as component">
            <app-dynamic-component [item]="item" [component]="component"></app-dynamic-component>
          </ng-container>
          <ng-container *ngIf="!itemComponent">
            <ng-container *ngTemplateOutlet="itemTemplate; context: { item: item }" />
          </ng-container>
        </ng-container>
      </ng-container>
      <ng-template #emptyList>
        <p>This list is empty</p>
      </ng-template>
    </ng-container>

    <ng-container *ngIf="listState.isLoading">
      <ng-container *ngIf="loadingContent; else defaultLoading">
        <ng-container *ngTemplateOutlet="loadingContent" />
      </ng-container>
      <ng-template #defaultLoading>
        <p>Loading...</p>
      </ng-template>
    </ng-container>

    <ng-container *ngIf="listState.isError">
      <ng-container *ngIf="errorContent; else defaultError">
        <ng-container *ngTemplateOutlet="errorContent" />
      </ng-container>
      <ng-template #defaultError>
        <p>Something went wrong...</p>
      </ng-template>
    </ng-container>
  `,
})
export class ListWrapper<T extends { id: number }> {
  @Input() listState!: { hasValue: boolean; isLoading: boolean; isError: boolean };
  @Input() items!: T[];

  @Input() itemComponent!: Type<{ item: T }>;

  resource = input<Resource<{ info: ApiListInfoSchema; results: T[] } | undefined>>();

  @ViewChild('componentOutlet', { read: ViewContainerRef, static: true })
  public componentOutlet!: ViewContainerRef;

  @ContentChild('itemTemplate') itemTemplate!: TemplateRef<{ item: T }>;
  @ContentChild('loadingContent') loadingContent!: TemplateRef<unknown>;
  @ContentChild('errorContent') errorContent!: TemplateRef<unknown>;
}
