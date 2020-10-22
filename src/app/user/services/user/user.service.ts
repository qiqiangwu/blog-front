import { Injectable } from '@angular/core';
import * as fromUser from '../../reducers';
import { UserActions } from '../../actions';
import { select, Store } from '@ngrx/store';
import { User } from '../../models/user';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private store: Store<fromUser.State>) {}

  setUserState(token: string, user: User) {
    this.store.dispatch(
      UserActions.setUserState({
        token,
        user,
      })
    );
  }

  getUser(): Observable<User> {
    return this.store.pipe(select(fromUser.selectUser));
  }

  getToken(): Observable<string> {
    return this.store.pipe(select(fromUser.selectUserToken));
  }

  signOut() {
    this.store.dispatch(UserActions.signOut());
  }
}
