import { Injectable } from '@angular/core';
import {
  ActivationStart,
  NavigationEnd,
  NavigationStart,
  Router,
} from '@angular/router';
import { select, Store } from '@ngrx/store';
import { combineLatest, Observable } from 'rxjs';
import { filter, withLatestFrom } from 'rxjs/operators';
import * as fromRoot from '../../reducers';
import { BreadCrumbActions } from '../../actions';
import { BreadCrumbItem } from '../../types/bread-crumb-item';

@Injectable({
  providedIn: 'root',
})
export class BreadCrumbService {
  constructor(private router: Router, private store: Store<fromRoot.State>) {}

  private initState: 'idle' | 'start' | 'end' = 'idle';

  init() {
    this.initState = 'start';
    this.bind();
  }

  getItems(): Observable<BreadCrumbItem[]> {
    return this.store.pipe(select(fromRoot.selectBreadCrumbItems));
  }

  jumpTo(index: number) {
    this.store.dispatch(BreadCrumbActions.jumpTo({ index }));
  }

  private bind() {
    const sub = combineLatest([
      this.router.events.pipe(
        filter((events) => events instanceof NavigationStart)
      ),
      this.router.events.pipe(
        filter((events) => events instanceof ActivationStart)
      ),
      this.router.events.pipe(
        filter((events) => events instanceof NavigationEnd)
      ),
    ])
      .pipe(
        withLatestFrom(
          this.store.pipe(select(fromRoot.selectBreadCrumbJumpToIndex))
        ),
        withLatestFrom(this.getItems())
      )
      .subscribe(([[[startEvt, activation, endEvt], jumpToIndex], items]) => {
        const isPop =
          (startEvt as NavigationStart).navigationTrigger === 'popstate';
        const data = (activation as ActivationStart).snapshot.data;
        const params = (activation as ActivationStart).snapshot.params;
        const url = (endEvt as NavigationEnd).url;

        if (data && data.root) {
          this.store.dispatch(
            BreadCrumbActions.reset({
              item: {
                url,
                title:
                  (data && data.title) ||
                  (params && params.title) ||
                  '未添加标题',
              },
            })
          );
        } else {
          if (!isPop) {
            this.store.dispatch(
              BreadCrumbActions.add({
                item: {
                  url,
                  title:
                    (data && data.title) ||
                    (params && params.title) ||
                    '未添加标题',
                },
                ignore: jumpToIndex !== -1 || this.isRefreshPage(items),
              })
            );
          } else {
            this.store.dispatch(BreadCrumbActions.pop());
          }
        }

        sub.unsubscribe();
        this.bind();

        this.initState = 'end';
      });
  }

  // 判断是否刷新页面
  private isRefreshPage(items) {
    if (items && items.length && this.initState === 'start') {
      return true;
    }
    return false;
  }
}
