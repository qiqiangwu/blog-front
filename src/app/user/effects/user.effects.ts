import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { exhaustMap, map } from 'rxjs/operators';
import { SignOutResult } from 'src/app/common/services/backend/backend-api.types';
import { BackendService } from 'src/app/common/services/backend/backend.service';
import { getProblemDescription } from 'src/app/common/utils/api/api-problem';
import { UserActions } from '../actions';

@Injectable()
export class UserEffects {
  signOut$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.signOut),
      exhaustMap(() =>
        this.backend.signOut().pipe(
          map((result: SignOutResult) => {
            if (result.kind === 'ok') {
              return UserActions.signOutSuccess();
            } else {
              return UserActions.signOutFailure({
                error: result.message || getProblemDescription(result.kind),
              });
            }
          })
        )
      )
    )
  );

  constructor(private actions$: Actions, private backend: BackendService) {}
}
