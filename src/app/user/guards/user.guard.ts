import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Logger } from '@nsalaun/ng-logger';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { NavigateService } from 'src/app/common/services/navigate/navigate.service';
import { SignInService } from 'src/app/sign-in/services/sign-in.service';
import { UserService } from '../services/user/user.service';

@Injectable({
  providedIn: 'root',
})
export class UserGuard implements CanActivate {
  private static readonly TAG = 'UserGuard';
  constructor(
    private userService: UserService,
    private navigate: NavigateService,
    private signInService: SignInService,
    private logger: Logger
  ) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    return this.userService.getUser().pipe(
      map((user) => {
        this.logger.debug(
          `${UserGuard.TAG} canActivate user: ${JSON.stringify(user)}`
        );

        return user != null;
      }),
      tap((isLogined) => {
        if (!isLogined) {
          this.signInService.setBackUrl(state.url);
          this.navigate.redirect('/sign-in');
        }
      })
    );
  }
}
