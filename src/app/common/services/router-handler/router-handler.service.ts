import { Injectable } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import { pairwise, filter } from 'rxjs/operators';
import { AppReuseStrategy } from 'src/app/app-reuse-strategy';
import { Logger } from '@nsalaun/ng-logger';

@Injectable({
  providedIn: 'root',
})
export class RouterHandlerService {
  private static readonly TAG = 'RouterHandlerService';

  constructor(private router: Router, private logger: Logger) {}

  // 返回删除路由复用
  popToDeleteRouteSnapshot() {
    // 路由全局处理
    this.router.events
      .pipe(
        filter((events) => events instanceof NavigationStart),
        pairwise()
      )
      .subscribe(([prev, current]) => {
        if (current instanceof NavigationStart) {
          if (current.navigationTrigger === 'popstate') {
            this.deleteRouteSnapshot((prev as NavigationStart).url);
          }
        }
      });
  }

  private deleteRouteSnapshot(url: string) {
    this.logger.debug(`${RouterHandlerService.TAG} delete router snapshot path: ${url}`);
    AppReuseStrategy.deleteRouteSnapshot(url);
  }
}
