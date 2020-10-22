import { createAction, props } from '@ngrx/store';

export const redirect = createAction(
  '[Router] Redirect',
  props<{
    url: string;
    replace: boolean;
  }>()
);

export const back = createAction(
  '[Router] Go Back',
  props<{
    delay: number;
  }>()
);
