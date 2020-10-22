import { Injectable } from '@angular/core';
import * as fromSignIn from '../reducers';
import { SignInPageActions } from '../actions';
import { select, Store } from '@ngrx/store';
import { filter, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class SignInService {
  constructor(private store: Store<fromSignIn.State>) {}

  setBackUrl(url: string) {
    // 延时到store初始化设置backUrl
    this.store
      .pipe(
        select(fromSignIn.selectFeatureState),
        filter((val) => !!val),
        take(1)
      )
      .subscribe(() => {
        this.store.dispatch(SignInPageActions.setBackUrl({ url }));
      });
  }
}
