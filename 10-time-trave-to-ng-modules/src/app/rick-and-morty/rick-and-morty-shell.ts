import { Component } from '@angular/core';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-rick-and-morty-shell',
  standalone: false,
  styleUrl: './rick-and-morty-shell.scss',
  template: `
    <div style="display: flex; justify-content: space-between; align-items: center">
      <h1>Rick and Morty App</h1>
      <div>
        <ng-container *ngIf="(authService.authState | async)?.isAuthenticated; else login">
          <span style="margin-right: 1rem">Zalogowano!</span>
          <button (click)="authService.logout()">Logout</button>
        </ng-container>
        <ng-template #login>
          <a routerLink="/auth">Login</a>
        </ng-template>
      </div>
    </div>
    <a routerLinkActive="active" routerLink="characters">Characters</a> |
    <a routerLinkActive="active" routerLink="episodes">Episodes</a> |
    <a routerLinkActive="active" routerLink="locations">Locations</a>
    <hr />
    <router-outlet></router-outlet>
  `,
})
export class RickAndMortyShell {
  constructor(public authService: AuthService) {}
}
