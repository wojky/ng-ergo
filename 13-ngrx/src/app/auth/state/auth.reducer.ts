import { createReducer, on } from '@ngrx/store';
import { defaultAuthState } from './auth.state';
import { AuthActions } from './auth.actions';

export const authReducer = createReducer(
  defaultAuthState,
  on(AuthActions.login, (state, action) => {
    return {
      ...state,
      isAuthenticated: true,
    };
  }),
  on(AuthActions.logout, (state) => {
    return {
      ...state,
      isAuthenticated: false,
    };
  }),
);
