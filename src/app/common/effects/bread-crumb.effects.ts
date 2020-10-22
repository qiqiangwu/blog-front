import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { tap, withLatestFrom } from 'rxjs/operators';
import { BreadCrumbActions } from '../actions';
import { BreadCrumbService } from '../services/bread-crumb/bread-crumb.service';

@Injectable()
export class BreadCrumbEffects {
  jumpTo$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(BreadCrumbActions.jumpTo),
        withLatestFrom(this.breadCrumbService.getItems()),
        tap(([{ index }, items]) => {
          const url = items[index].url;

          this.router.navigateByUrl(url);
        })
      ),
    { dispatch: false }
  );

  constructor(
    private actions$: Actions,
    private breadCrumbService: BreadCrumbService,
    private router: Router
  ) {}
}
