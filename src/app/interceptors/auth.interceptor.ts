import { AuthService } from './../services/auth.service';
import { isPlatformServer } from '@angular/common';
import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject, PLATFORM_ID } from '@angular/core';
import { catchError, switchMap, throwError } from 'rxjs';

export const authInterceptor: HttpInterceptorFn = (req, next) => {

  const platformId = inject(PLATFORM_ID);
  const authService = inject(AuthService);

  const token = localStorage.getItem('token');

  if (isPlatformServer(platformId)) {
    return next(req);
  }

  let headers = req.headers.set('Content-Tpye', 'application/json');

  if (token) {
    headers = headers.set('Authorization', `Bearer ${token}`);
  }

  const authReq = req.clone({headers});

  return next(authReq).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status == 401 || error.status == 403) {
        return authService.refreshToken().pipe(
          switchMap(newToken => {
            localStorage.setItem('Token', newToken);
            const updateHeaders = req.headers.set('Authorization', `Bearer ${newToken}`);
            const newRequest = req.clone({headers: updateHeaders});

            return next(newRequest);
          })
        )
      }
      return throwError(() => error);
    }));

};
