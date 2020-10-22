import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer,
} from '@ngrx/store';
import { environment } from '../../../environments/environment';
import * as fromSignInPage from './sign-in-page.reducer';

export const signInFeatureKey = 'signIn';

export interface State {
  [fromSignInPage.signInPageFeatureKey]: fromSignInPage.State;
}

export const reducers: ActionReducerMap<State> = {
  [fromSignInPage.signInPageFeatureKey]: fromSignInPage.reducer,
};

export const metaReducers: MetaReducer<State>[] = !environment.production
  ? []
  : [];

export const selectFeatureState = createFeatureSelector<State>(
  signInFeatureKey
);

export const selectSignInPageState = createSelector(
  selectFeatureState,
  (state) => state[fromSignInPage.signInPageFeatureKey]
);
export const selectSignInLoading = createSelector(
  selectSignInPageState,
  fromSignInPage.selectLoading
);
export const selectSignInSuccess = createSelector(
  selectSignInPageState,
  fromSignInPage.selectSuccess
);
export const selectSignInError = createSelector(
  selectSignInPageState,
  fromSignInPage.selectError
);
export const selectBackUrl = createSelector(
  selectSignInPageState,
  fromSignInPage.selectBackUrl
);
