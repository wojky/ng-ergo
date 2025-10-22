import { authReducer } from '../auth/state/auth.reducer';
import { AuthState } from '../auth/state/auth.state';

export type AppState = {
  auth: AuthState;
};

export const appReducers = {
  auth: authReducer,
};
