import { createAction, props } from '@ngrx/store';
import { User } from '../models/user';

export const setUserState = createAction(
  '[User] Set User State',
  props<{
    token: string;
    user: User;
  }>()
);

export const signOut = createAction('[User] Sign Out');
export const signOutSuccess = createAction('[User] Sign Out Success');
export const signOutFailure = createAction(
  '[User] Sign Out Failure',
  props<{ error: any }>()
);
