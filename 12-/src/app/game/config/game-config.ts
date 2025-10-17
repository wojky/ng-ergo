import { Component, inject } from '@angular/core';
import { GameConfigService } from './game-config.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-game-config',
  imports: [RouterLink, MatButtonModule],
  template: `
    <a routerLink="../..">Back</a>

    <button matButton (click)="startGame()">Start game</button>
  `,
  styles: ``,
})
export class GameConfig {
  private service = inject(GameConfigService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  startGame() {
    this.service.startNewGame();
    this.router.navigate(['..', 'board'], { relativeTo: this.route });
  }
}
