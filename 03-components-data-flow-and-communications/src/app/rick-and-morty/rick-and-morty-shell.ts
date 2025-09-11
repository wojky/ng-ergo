import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-rick-and-morty-shell',
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  styles: `
    a {
      text-decoration: none;
      color: blue;
    }

    .active {
      font-weight: bold;
      color: darkblue;
    }
  `,
  template: `
    <h1>Rick and Morty App</h1>
    <a routerLinkActive="active" routerLink="characters">Characters</a> |
    <a routerLinkActive="active" routerLink="episodes">Episodes</a> |
    <a routerLinkActive="active" routerLink="locations">Locations</a>
    <hr />
    <router-outlet />
  `,
})
export class RickAndMortyShell {}
