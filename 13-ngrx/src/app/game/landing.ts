import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { MatAnchor, MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-game-landing',
  imports: [RouterLink, MatButtonModule],
  template: `
    <nav>
      <a matButton [routerLink]="['play/config']">New Game</a>
      <a matButton [routerLink]="['hall-of-fame']">Highscores</a>
      <a matButton routerLink="../rick-and-morty">Go to wiki</a>
    </nav>
  `,
  styles: `
    nav {
      margin-top: 2rem;
      display: flex;
      gap: 1rem;
      align-items: center;
      flex-direction: column;
    }
  `,
})
export class GameLanding {}
