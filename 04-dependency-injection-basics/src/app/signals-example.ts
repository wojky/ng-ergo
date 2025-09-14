import { Component, signal, computed, linkedSignal, untracked, effect } from '@angular/core';

@Component({
  selector: 'app-signals-example',
  template: `
    <h1>{{ titleLinked() }}</h1>

    <h2>Count: {{ count() }}</h2>

    <button (click)="updateTitle()">Update Title</button>

    <button (click)="count.set(count() + 1)">Increment Count</button>
  `,
  styles: [],
})
export class SignalsExample {
  protected title = signal('04-dependency-injection-basics', {
    // equal: (a, b) => a.startsWith(b[0]),
  });

  protected count = signal(0);

  title2 = '04-dependency-injection-basics';

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
