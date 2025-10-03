import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-rick-and-morty-shell',
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  styles: `
    :host {
      display: block;
      padding: 0 1rem;
    }
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
    <div style="display: flex; justify-content: space-between; align-items: center">
      <h1>Rick and Morty App</h1>
      <div>
        @if (authService.authState().isAuthenticated) {
          <span style="margin-right: 1rem">Zalogowano!</span>
          <button (click)="authService.logout()">Logout</button>
        } @else {
          <a routerLink="/auth">Login</a>
        }
      </div>
    </div>
    <a routerLinkActive="active" routerLink="characters">Characters</a> |
    <a routerLinkActive="active" routerLink="episodes">Episodes</a> |
    <a routerLinkActive="active" routerLink="locations">Locations</a>
    <hr />
    <router-outlet />
  `,
})
export class RickAndMortyShell {
  authService = inject(AuthService);
  private router = inject(Router);

  ngOnInit() {
    // this.router.events.subscribe(console.log);
  }
}
