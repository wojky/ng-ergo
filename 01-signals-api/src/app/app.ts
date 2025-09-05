import { Component, signal, computed } from '@angular/core';
import { TestComponent } from './test.component';

@Component({
  selector: 'app-root',
  imports: [TestComponent],
  template: `
    <h1>Welcome to {{ title() }}!</h1>
    <h2>uppercased: {{ titleUppercased() }}</h2>

    <button (click)="updateTitle()">Update Title</button>
    <app-test />
    <!-- <app-test />
    <app-test />
    <app-test /> -->
  `,
  styles: [],
})
export class App {
  protected title = signal('0-angular-first-project');
  title2 = '0-angular-first-project2';

  titleUppercased = computed(() => {
    return this.title().toUpperCase();
  });

  constructor() {
    console.log(this.title());
  }

  updateTitle() {
    this.title.update((value) => `${value}-update`);
  }
}
