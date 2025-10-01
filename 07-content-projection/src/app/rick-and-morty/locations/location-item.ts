import { Component, input } from '@angular/core';
import { Location } from './location.contract';

@Component({
  selector: 'app-location-item',
  template: `
    <div class="location-item">
      <h3>{{ item().name }}</h3>
      <p><strong>Type:</strong> {{ item().type }}</p>
      <p><strong>Dimension:</strong> {{ item().dimension }}</p>

      @if (item().residents.length) {
        <p><strong>Residents:</strong> {{ item().residents.length }}</p>
      }
    </div>
  `,
  styles: [
    `
      .location-item {
        border: 1px solid #ccc;
        padding: 1rem;
        border-radius: 6px;
        margin-bottom: 1rem;
        background: #f8f8f8;
      }
      h3 {
        margin-top: 0;
      }
    `,
  ],
})
export class LocationItemComponent {
  item = input.required<Location>();
}
