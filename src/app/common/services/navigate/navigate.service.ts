import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { RouterActions } from '../../actions';
import * as fromRoot from '../../reducers';

@Injectable({
  providedIn: 'root',
})
export class NavigateService {
  constructor(private store: Store<fromRoot.State>) {}

  back(delay = 0) {
    this.store.dispatch(
      RouterActions.back({
        delay,
      })
    );
  }

  redirect(url: string, replace = false, delay = 0) {
    this.store.dispatch(
      RouterActions.redirect({
        url,
        replace
      })
    );
  }
}
