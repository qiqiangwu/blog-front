import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer,
} from '@ngrx/store';
import { environment } from '../../../environments/environment';
import * as fromHomeArticleList from './home-article-list.reducer';

export const homeFeatureKey = 'home';

export interface State {
  [fromHomeArticleList.homeArticleListFeatureKey]: fromHomeArticleList.State;
}

export const reducers: ActionReducerMap<State> = {
  [fromHomeArticleList.homeArticleListFeatureKey]: fromHomeArticleList.reducer,
};

export const metaReducers: MetaReducer<State>[] = !environment.production
  ? []
  : [];

export const selectFeatureState = createFeatureSelector<State>(homeFeatureKey);

export const selectHomeArticleListState = createSelector(
  selectFeatureState,
  (state) => state[fromHomeArticleList.homeArticleListFeatureKey]
);
export const selectHomeArticleListIds = createSelector(
  selectHomeArticleListState,
  fromHomeArticleList.selectIds
);
export const selectHomeArticleListLoading = createSelector(
  selectHomeArticleListState,
  fromHomeArticleList.selectLoading
);
export const selectHomeArticleListError = createSelector(
  selectHomeArticleListState,
  fromHomeArticleList.selectError
);
export const selectHomeArticleListIsInit = createSelector(
  selectHomeArticleListState,
  fromHomeArticleList.selectIsInit
);
export const selectHomeArticleListNoMore = createSelector(
  selectHomeArticleListState,
  fromHomeArticleList.selectNoMore
);
