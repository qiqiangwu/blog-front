import { createAction, props } from '@ngrx/store';
import { User } from 'src/app/user/models/user';

export const signInRequest = createAction(
  '[SignInPage] Sign In Request',
  props<{ account: string; password: string }>()
);
export const signInSuccess = createAction(
  '[SignInPage] Sign In Success',
  props<{
    token: string;
    user: User;
  }>()
);
export const signInFailure = createAction(
  '[SignInPage] Sign In Failure',
  props<{
    error: any;
  }>()
);
export const setBackUrl = createAction(
  '[SignInPage] Set Back Url',
  props<{
    url: string;
  }>()
);
