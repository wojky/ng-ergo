import { AppState } from '../../core/app.reducers';

export const selectIsAuthenticated = (state: AppState) => state.auth.isAuthenticated;

// export const selectIsAuthenticated = createSelector(
//   (state: AppState) => state.auth,
//   (auth) => auth.isAuthenticated,
// );
