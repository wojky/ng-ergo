import { Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private router: Router) {}

  #authState = new BehaviorSubject({
    isAuthenticated: false,
  });

  authState = this.#authState.asObservable();

  login(username: string, password: string): void {
    this.#authState.next({ isAuthenticated: true });

    this.router.navigate(['/']);
  }

  logout(): void {
    this.#authState.next({ isAuthenticated: false });
  }
}
