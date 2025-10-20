import { inject, Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';
import { AppState } from '../core/app.reducers';
import { Store } from '@ngrx/store';
import { AuthActions } from './state/auth.actions';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private router = inject(Router);
  private store = inject<Store<AppState>>(Store);

  #authState = signal({
    isAuthenticated: false,
  });

  authState = this.#authState.asReadonly();

  login(username: string, password: string): void {
    this.#authState.set({ isAuthenticated: true });
    this.store.dispatch(AuthActions.login({ username, password }));

    this.router.navigate(['/']);
  }

  logout(): void {
    this.#authState.set({ isAuthenticated: false });
    this.store.dispatch(AuthActions.logout());
  }
}
