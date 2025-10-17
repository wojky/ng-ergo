import { Component, inject } from '@angular/core';
import { GameConfigService } from '../config/game-config.service';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-game-board',
  imports: [JsonPipe],
  template: `
    <p>game-board works!</p>

    <p>Config value: {{ service.config() | json }}</p>
  `,
  styles: ``,
})
export class GameBoard {
  service = inject(GameConfigService);
}
