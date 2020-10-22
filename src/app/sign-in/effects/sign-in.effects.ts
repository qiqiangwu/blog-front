import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { exhaustMap, map } from 'rxjs/operators';
import { SignInResult } from 'src/app/common/services/backend/backend-api.types';
import { BackendService } from 'src/app/common/services/backend/backend.service';
import { getProblemDescription } from 'src/app/common/utils/api/api-problem';
import { UserService } from 'src/app/user/services/user/user.service';
import { SignInPageActions } from '../actions';

@Injectable()
export class SignInEffects {
  signIn$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SignInPageActions.signInRequest),
      exhaustMap(({ account, password }) =>
        this.backend.signIn(account, password).pipe(
          map((result: SignInResult) => {
            if (result.kind === 'ok') {
              this.userService.setUserState(result.token, result.user);

              return SignInPageActions.signInSuccess({
                token: result.token,
                user: result.user,
              });
            } else {
              return SignInPageActions.signInFailure({
                error: result.message || getProblemDescription(result.kind),
              });
            }
          })
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private backend: BackendService,
    private userService: UserService
  ) {}
}
