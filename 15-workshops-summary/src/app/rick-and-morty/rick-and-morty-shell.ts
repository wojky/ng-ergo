import { Component, DestroyRef, effect, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { Store } from '@ngrx/store';
import { AppState } from '../core/app.reducers';
import { selectIsAuthenticated } from '../auth/state/auth.selectors';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

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
    <a routerLinkActive="active" routerLink="locations">Locations</a> |
    <a routerLinkActive="active" routerLink="../game">Game</a> |
    <a routerLinkActive="active" routerLink="ngrx-signals">@ngrx/signals example</a>
    <hr />
    <router-outlet />
  `,
})
export class RickAndMortyShell {
  authService = inject(AuthService);
  private router = inject(Router);
  private store = inject<Store<AppState>>(Store);

  destroy$ = inject(DestroyRef);

  isAuthenticated = this.store.selectSignal(selectIsAuthenticated);

  e = effect(() => {
    console.log('Auth changed:', this.isAuthenticated());
  });

  ngOnInit() {
    // this.router.events.subscribe(console.log);
    // this.store
    //   .select(selectIsAuthenticated)
    //   .pipe(takeUntilDestroyed(this.destroy$))
    //   .subscribe((isAuth) => {
    //     console.log('Auth state changed', isAuth);
    //   });
  }
}
