import { Component, computed, input, model } from '@angular/core';

@Component({
  selector: 'app-rating',
  standalone: false,
  template: `
    <div style="display: flex; gap: 4px;">
      @for (rate of rates(); track rate.value) {
        <span (click)="setRating(rate.value)">⭐</span>
      }
    </div>
  `,

  styles: [``],
})
export class Rating {
  max = input(5);

  rating = model(0);

  rates = computed(() => {
    return Array.from({ length: this.max() }, (_, i) => {
      return {
        filled: false,
        value: i + 1,
      };
    });
  });

  setRating(value: number) {
    this.rating.set(value);
  }
}
