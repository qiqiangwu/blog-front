import { Action, createReducer, on } from '@ngrx/store';
import { User } from '../models/user';
import { UserActions } from '../actions';

export const userFeatureKey = 'user';

export interface State {
  token: string;
  user: User;
}

export const initialState: State = {
  token: undefined,
  user: undefined,
};

export const reducer = createReducer(
  initialState,
  on(UserActions.setUserState, (state, { token, user }) => ({
    token,
    user,
  })),
  on(UserActions.signOut, (state) => ({
    token: undefined,
    user: undefined,
  }))
);

export const selectUser = (state) => state.user;
export const selectToken = (state) => state.token;
