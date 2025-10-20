import {
  ApplicationConfig,
  inject,
  Injectable,
  provideBrowserGlobalErrorListeners,
  provideZonelessChangeDetection,
} from '@angular/core';
import {
  provideRouter,
  RouterStateSnapshot,
  TitleStrategy,
  withComponentInputBinding,
} from '@angular/router';
import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { logInterceptor, tokenInterceptor } from './core/interceptors';
import { Title } from '@angular/platform-browser';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { authReducer } from './auth/state/auth.reducer';
import { appReducers } from './core/app.reducers';
import { AuthEffects } from './auth/state/auth.effects';

@Injectable()
export class AppTitleStrategy extends TitleStrategy {
  title = inject(Title);

  override updateTitle(snapshot: RouterStateSnapshot): void {
    const title = this.buildTitle(snapshot);
    // console.log(snapshot);
    this.title.setTitle(title ? `${title} | Rick and Morty Wiki` : 'Default');
  }
}

export const appConfig: ApplicationConfig = {
  providers: [
    { provide: TitleStrategy, useClass: AppTitleStrategy },
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideRouter(routes, withComponentInputBinding()),
    provideHttpClient(withInterceptors([logInterceptor, tokenInterceptor])),
    provideStore(appReducers),
    provideEffects(AuthEffects),
  ],
};
