import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { RouterActions } from '../actions';
import { tap, switchMap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { timer } from 'rxjs';

@Injectable()
export class RouterEffects {
  back$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(RouterActions.back),
        switchMap(({ delay = 0 }) => timer(delay)),
        tap(() => {
          history.back();
        })
      ),
    { dispatch: false }
  );
  redirect$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(RouterActions.redirect),
        tap(({ url, replace }) => {
          this.router.navigate([url], {
            replaceUrl: replace,
          });
        })
      ),
    { dispatch: false }
  );
  constructor(private actions$: Actions, private router: Router) {}
}
