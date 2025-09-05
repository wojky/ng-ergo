import { Component, signal, computed, linkedSignal, untracked, effect } from '@angular/core';
import { TestComponent } from './test.component';
import { CharacterList } from './character-list/character-list';

@Component({
  selector: 'app-root',
  imports: [TestComponent, CharacterList],
  template: `
    <!-- <h1>Welcome to {{ title() }}!</h1> -->
    <!-- <h2>uppercased: {{ titleUppercased() }}</h2> -->

    <h1>{{ titleLinked() }}</h1>

    <h2>Count: {{ count() }}</h2>

    <button (click)="updateTitle()">Update Title</button>

    <button (click)="count.set(count() + 1)">Increment Count</button>
    <app-test />

    <app-character-list />
  `,
  styles: [],
})
export class App {
  protected title = signal('0-angular-first-project', {
    // equal: (a, b) => a.startsWith(b[0]),
  });

  protected count = signal(0);

  title2 = '0-angular-first-project2';

  titleUppercased = computed(() => {
    return this.title().toUpperCase();
  });

  titleLinked = linkedSignal(() => {
    return this.title() + '-linked-' + untracked(this.count);
  });

  anotherTitle = computed(() => {
    return this.titleUppercased() + '-computed';
  });

  saveTitleOnLocalStorage = effect(() => {
    console.log({
      title: this.title(),
      titleUppercased: this.titleUppercased(),
      anotherTitle: this.anotherTitle(),
      titleLinked: this.titleLinked(),
      count: this.count(),
    });

    localStorage.setItem('title', this.title());
  });

  constructor() {}

  updateTitle() {
    this.title.update((value) => `${value}-update`);
  }
}
