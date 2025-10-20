import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-rick-and-morty-game-shell',
  imports: [RouterOutlet],
  template: `
    <h1 style="text-align: center">Rick and Morty Game</h1>
    <router-outlet />
  `,
  styles: `
    :host {
      display: block;
      max-width: 720px;
      margin: 0 auto;
    }
  `,
})
export class RickAndMortyGameShell {}
