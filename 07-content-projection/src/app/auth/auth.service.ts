import { inject, Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private router = inject(Router);

  #authState = signal({
    isAuthenticated: false,
  });

  authState = this.#authState.asReadonly();

  login(username: string, password: string): void {
    this.#authState.set({ isAuthenticated: true });

    this.router.navigate(['/']);
  }

  logout(): void {
    this.#authState.set({ isAuthenticated: false });
  }
}
