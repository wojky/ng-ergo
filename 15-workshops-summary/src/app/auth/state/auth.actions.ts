import { createActionGroup, props, emptyProps } from '@ngrx/store';

export const AuthActions = createActionGroup({
  source: 'Auth',
  events: {
    Login: props<{ username: string; password: string }>(),
    LoginSuccess: emptyProps(),
    LoginFailure: props<{ error: string }>(),
    Logout: emptyProps(),
  },
});
