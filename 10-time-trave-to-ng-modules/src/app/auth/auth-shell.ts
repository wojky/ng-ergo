import { Component } from '@angular/core';
import { AuthService } from './auth.service';
@Component({
  selector: 'app-auth-shell',
  standalone: false,
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
  constructor(private authService: AuthService) {}

  onSubmit() {
    this.authService.login('username', 'password');
  }
}
