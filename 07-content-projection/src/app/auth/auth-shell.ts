import { Component, inject } from '@angular/core';
import { AuthService } from './auth.service';
@Component({
  selector: 'app-auth-shell',
  imports: [],
  template: `
    <p>Login</p>

    <div>
      <input placeholder="Email" />
      <br />
      <input type="password" placeholder="Password" />
      <br />
      <button (click)="onSubmit()">Submit</button>
    </div>
  `,
  styles: ``,
})
export class AuthShell {
  authService = inject(AuthService);

  onSubmit() {
    this.authService.login('username', 'password');
  }
}
