import { Action, createReducer, on } from '@ngrx/store';
import { SignInPageActions } from '../actions';

export const signInPageFeatureKey = 'signInPage';

export interface State {
  loading: boolean;
  success: boolean;
  error: string;
  backUrl: string;
}

export const initialState: State = {
  loading: undefined,
  success: undefined,
  error: undefined,
  backUrl: undefined,
};

export const reducer = createReducer(
  initialState,
  on(SignInPageActions.setBackUrl, (state, { url }) => ({
    ...state,
    backUrl: url,
  })),
  on(SignInPageActions.signInRequest, (state) => ({
    ...state,
    loading: true,
    success: undefined,
    error: undefined,
  })),
  on(SignInPageActions.signInSuccess, (state) => ({
    ...state,
    loading: false,
    success: true,
  })),
  on(SignInPageActions.signInFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  }))
);

export const selectLoading = (state) => state.loading;
export const selectSuccess = (state) => state.success;
export const selectError = (state) => state.error;
export const selectBackUrl = (state) => state.backUrl;
