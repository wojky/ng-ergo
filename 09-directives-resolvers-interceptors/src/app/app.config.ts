import {
  ApplicationConfig,
  provideBrowserGlobalErrorListeners,
  provideZonelessChangeDetection,
} from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient, withInterceptors, HttpInterceptorFn } from '@angular/common/http';
import { map, of, switchMap } from 'rxjs';

const logInterceptor: HttpInterceptorFn = (req, next) => {
  // console.log('HTTP Request', req.url, req);
  return next(req);
};

const tokenInterceptor: HttpInterceptorFn = (req, next) => {
  // // get token
  // const token = 'test';

  function getToken() {
    return of('test');
  }

  // const reqClone = req.clone({
  //   setHeaders: {
  //     'X-Auth-Token': token,
  //     // Authorization: `Bearer ${token}`
  //   },
  // });

  return getToken().pipe(
    switchMap((token) => {
      return next(
        req.clone({
          setHeaders: {
            Authorization: `Bearer ${token}`,
          },
        }),
      );
    }),
  );
};

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideRouter(routes, withComponentInputBinding()),
    provideHttpClient(withInterceptors([logInterceptor, tokenInterceptor])),
  ],
};
