import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserService } from 'src/app/user/services/user/user.service';
import {
  filter,
  map,
  switchMap,
  take,
  tap,
  withLatestFrom,
} from 'rxjs/operators';

@Injectable()
export class AddAuthorizationHeaderInterceptor implements HttpInterceptor {
  constructor(private userService: UserService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    return this.userService.getToken().pipe(
      take(1),
      switchMap((token) => {
        if (token) {
          return next.handle(
            request.clone({
              setHeaders: {
                authorization: token,
              },
              withCredentials: true,
            })
          );
        } else {
          return next.handle(request);
        }
      })
    );
  }
}
