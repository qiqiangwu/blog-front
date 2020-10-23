import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
} from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { UserService } from 'src/app/user/services/user/user.service';
import { NavigateService } from '../services/navigate/navigate.service';
import { NzMessageService } from 'ng-zorro-antd/message';

@Injectable()
export class UnauthorizedInterceptor implements HttpInterceptor {
  private unUnauthorized = false;

  constructor(
    private userService: UserService,
    private navigate: NavigateService,
    private message: NzMessageService
  ) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      tap((event) => {
        if (event instanceof HttpResponse) {
          if (event.url.indexOf('/auth/signin') !== -1) {
            this.unUnauthorized = false;
          }
        }
      }),
      catchError((err) => {
        // 身份认证失败
        if (err.error && err.error.code === 4010001) {
          if (this.unUnauthorized) {
            return throwError(err);
          }
          this.unUnauthorized = true;

          this.userService.signOut();
          this.message.create('warn', '身份认证失效，请重新登录!');
          setTimeout(() => {
            this.navigate.redirect('/sign-in');
          }, 2000);
        }

        return throwError(err);
      })
    );
  }
}
