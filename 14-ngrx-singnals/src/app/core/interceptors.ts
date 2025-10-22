import { HttpInterceptorFn } from '@angular/common/http';
import { of, switchMap } from 'rxjs';

export const logInterceptor: HttpInterceptorFn = (req, next) => {
  // console.log('HTTP Request', req.url, req);
  return next(req);
};

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
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
