import { Component, inject } from '@angular/core';
import { GameConfigService } from './game-config.service';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-game-container',
  imports: [RouterOutlet],
  template: `<router-outlet />`,
  styles: ``,
})
export class GameContainer {
  private service = inject(GameConfigService);

  ngOnInit() {
    this.service.resetGame();
  }
}
