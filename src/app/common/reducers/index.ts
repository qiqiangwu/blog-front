import {
  ActionReducer,
  ActionReducerMap,
  createSelector,
  MetaReducer,
} from '@ngrx/store';
import { localStorageSync } from 'ngrx-store-localstorage';

import { environment } from '../../../environments/environment';
import * as fromArticleListStore from './article-list-store.reducer';
import * as fromBreadCrumb from './bread-crumb.reducer';

export interface State {
  [fromArticleListStore.articleListStoreFeatureKey]: fromArticleListStore.State;
  [fromBreadCrumb.breadCrumbFeatureKey]: fromBreadCrumb.State;
}

export const reducers: ActionReducerMap<State> = {
  [fromArticleListStore.articleListStoreFeatureKey]:
    fromArticleListStore.reducer,
  [fromBreadCrumb.breadCrumbFeatureKey]: fromBreadCrumb.reducer,
};

export function localStorageSyncReducer(
  reducer: ActionReducer<State>
): ActionReducer<State> {
  return localStorageSync({ keys: ['user', 'breadCrumb'], rehydrate: true })(
    reducer
  );
}

export const metaReducers: MetaReducer<State>[] = !environment.production
  ? [localStorageSyncReducer]
  : [localStorageSyncReducer];

export const selectArticleListStoreState = (state: State) =>
  state[fromArticleListStore.articleListStoreFeatureKey];
export const selectArticleListStoreEntities = createSelector(
  selectArticleListStoreState,
  fromArticleListStore.selectArticleEntities
);
export const selectAllArticles = createSelector(
  selectArticleListStoreState,
  fromArticleListStore.selectAllArticles
);

export const selectBreadCrumbState = (state) =>
  state[fromBreadCrumb.breadCrumbFeatureKey];

export const selectBreadCrumbItems = createSelector(
  selectBreadCrumbState,
  fromBreadCrumb.selectItems
);
export const selectBreadCrumbJumpToIndex = createSelector(
  selectBreadCrumbState,
  fromBreadCrumb.selectJumpToIndex
);
