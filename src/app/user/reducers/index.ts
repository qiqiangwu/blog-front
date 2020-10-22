import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer,
} from '@ngrx/store';
import { environment } from '../../../environments/environment';
import * as fromUser from './user.reducer';

export const userFeatureKey = 'user';

export interface State {
  [fromUser.userFeatureKey]: fromUser.State;
}

export const reducers: ActionReducerMap<State> = {
  [fromUser.userFeatureKey]: fromUser.reducer,
};

export const metaReducers: MetaReducer<State>[] = !environment.production
  ? []
  : [];

const selectFeatureState = createFeatureSelector<State>(userFeatureKey);

const selectUserState = createSelector(
  selectFeatureState,
  (state) => state[fromUser.userFeatureKey]
);
export const selectUser = createSelector(selectUserState, fromUser.selectUser);
export const selectUserToken = createSelector(selectUserState,fromUser.selectToken);