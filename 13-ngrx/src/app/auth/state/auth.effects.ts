import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, of, switchMap, tap } from 'rxjs';
import { AuthActions } from './auth.actions';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

// const authLogin = createEffect(
//   (actions = inject(Actions)) => {
//     return actions.pipe(ofType(AuthActions.login), tap(console.log));
//   },
//   { functional: true, dispatch: false },
// );

@Injectable()
export class AuthEffects {
  private actions = inject(Actions);
  private router = inject(Router);
  private snacks = inject(MatSnackBar);

  login$ = createEffect(() => {
    return this.actions.pipe(
      ofType(AuthActions.login),
      switchMap((action) => {
        return of({ username: action.username, password: action.password });
      }),
      map((response) => {
        return 'error' in response
          ? AuthActions.loginFailure({ error: response.error as string })
          : AuthActions.loginSuccess();
      }),
    );
  });

  loginSuccess$ = createEffect(
    () => {
      return this.actions.pipe(
        ofType(AuthActions.loginSuccess),
        tap((action) => {
          console.log('User logged in:', action);
          this.router.navigate(['/']);
          this.snacks.open('Login Successful', 'Close', { duration: 3000 });
        }),
      );
    },
    { dispatch: false },
  );

  loginFailure$ = createEffect(
    () => {
      return this.actions.pipe(
        ofType(AuthActions.loginFailure),
        tap((action) => {
          this.snacks.open(`Login Failed: ${action.error}`, 'Close', { duration: 3000 });
        }),
      );
    },
    { dispatch: false },
  );
}

// export const authEffects = {
//   authLogin,
// };
