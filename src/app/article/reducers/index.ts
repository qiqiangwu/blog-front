import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer,
} from '@ngrx/store';
import { environment } from '../../../environments/environment';
import * as fromCatalogList from './catalog-list.reducer';
import * as fromAddCatalog from './add-catalog.reducer';
import * as fromPublishArticleList from './publish-article-list.reducer';
import * as fromCreateArticle from './create-article.reducer';
import * as fromUpdateArticle from './update-article.reducer';
import * as fromUpdateCatalog from './update-catalog.reducer';
import * as fromDeleteCatalog from './delete-catalog.reducer';
import * as fromDeleteArticle from './delete-article.reducer';
import * as fromArticleDetail from './article-detail.reducer';
import * as fromPublishArticleDetail from './publish-article-detail.reducer';

export const articleFeatureKey = 'article';

export interface State {
  [fromCatalogList.catalogListFeatureKey]: fromCatalogList.State;
  [fromAddCatalog.addCatalogFeatureKey]: fromAddCatalog.State;
  [fromPublishArticleList.publishArticleListFeatureKey]: fromPublishArticleList.State;
  [fromCreateArticle.createArticleFeatureKey]: fromCreateArticle.State;
  [fromUpdateArticle.updateArticleFeatureKey]: fromUpdateArticle.State;
  [fromUpdateCatalog.updateCatalogFeatureKey]: fromUpdateCatalog.State;
  [fromDeleteCatalog.deleteCatalogFeatureKey]: fromDeleteCatalog.State;
  [fromDeleteArticle.deleteArticleFeatureKey]: fromDeleteArticle.State;
  [fromArticleDetail.articleDetailFeatureKey]: fromArticleDetail.State;
  [fromPublishArticleDetail.publishArticleDetailFeatureKey]: fromPublishArticleDetail.State;
}

export const reducers: ActionReducerMap<State> = {
  [fromCatalogList.catalogListFeatureKey]: fromCatalogList.reducer,
  [fromAddCatalog.addCatalogFeatureKey]: fromAddCatalog.reducer,
  [fromPublishArticleList.publishArticleListFeatureKey]:
    fromPublishArticleList.reducer,
  [fromCreateArticle.createArticleFeatureKey]: fromCreateArticle.reducer,
  [fromUpdateArticle.updateArticleFeatureKey]: fromUpdateArticle.reducer,
  [fromUpdateCatalog.updateCatalogFeatureKey]: fromUpdateCatalog.reducer,
  [fromDeleteCatalog.deleteCatalogFeatureKey]: fromDeleteCatalog.reducer,
  [fromDeleteArticle.deleteArticleFeatureKey]: fromDeleteArticle.reducer,
  [fromArticleDetail.articleDetailFeatureKey]: fromArticleDetail.reducer,
  [fromPublishArticleDetail.publishArticleDetailFeatureKey]:
    fromPublishArticleDetail.reducer,
};

export const metaReducers: MetaReducer<State>[] = !environment.production
  ? []
  : [];

export const selectFeatureState = createFeatureSelector<State>(
  articleFeatureKey
);

export const selectCatalogListState = createSelector(
  selectFeatureState,
  (state) => state[fromCatalogList.catalogListFeatureKey]
);
export const selectCatalogListLoading = createSelector(
  selectCatalogListState,
  fromCatalogList.selectLoading
);
export const selectCatalogList = createSelector(
  selectCatalogListState,
  fromCatalogList.selectList
);
export const selectCatalogListError = createSelector(
  selectCatalogListState,
  fromCatalogList.selectError
);
export const selectCatalogListActiveId = createSelector(
  selectCatalogListState,
  fromCatalogList.selectActiveId
);
export const selectActiveCatalog = createSelector(
  selectCatalogList,
  selectCatalogListActiveId,
  (list, activeId) => {
    return list && list.find((item) => item.id === activeId);
  }
);

export const selectAddCatalogState = createSelector(
  selectFeatureState,
  (state) => state[fromAddCatalog.addCatalogFeatureKey]
);
export const selectAddCatalogLoading = createSelector(
  selectAddCatalogState,
  fromAddCatalog.selectLoading
);
export const selectAddCatalogSuccess = createSelector(
  selectAddCatalogState,
  fromAddCatalog.selectSuccess
);
export const selectAddCatalogError = createSelector(
  selectAddCatalogState,
  fromAddCatalog.selectError
);

export const selectUpdateCatalogState = createSelector(
  selectFeatureState,
  (state) => state[fromUpdateCatalog.updateCatalogFeatureKey]
);
export const selectUpdateCatalogLoading = createSelector(
  selectUpdateCatalogState,
  fromUpdateCatalog.selectLoading
);
export const selectUpdateCatalogSuccess = createSelector(
  selectUpdateCatalogState,
  fromUpdateCatalog.selectSuccess
);
export const selectUpdateCatalogError = createSelector(
  selectUpdateCatalogState,
  fromUpdateCatalog.selectError
);

export const selectPublishArticleListState = createSelector(
  selectFeatureState,
  (state) => state[fromPublishArticleList.publishArticleListFeatureKey]
);
export const selectPublishArticleListLoading = createSelector(
  selectPublishArticleListState,
  fromPublishArticleList.selectLoading
);
export const selectPublishArticleIds = createSelector(
  selectPublishArticleListState,
  fromPublishArticleList.selectIds
);
export const selectPublishArticleListError = createSelector(
  selectPublishArticleListState,
  fromPublishArticleList.selectError
);
export const selectPublishArticleListActiveId = createSelector(
  selectPublishArticleListState,
  fromPublishArticleList.selectActiveId
);
export const selectPublishArticleListIsInit = createSelector(
  selectPublishArticleListState,
  fromPublishArticleList.selectIsInit
);
export const selectPublishArticleListNoMore = createSelector(
  selectPublishArticleListState,
  fromPublishArticleList.selectNoMore
);

export const selectUpdateArticleState = createSelector(
  selectFeatureState,
  (state) => state[fromUpdateArticle.updateArticleFeatureKey]
);
export const selectUpdateArticleLoading = createSelector(
  selectUpdateArticleState,
  fromUpdateArticle.selectLoading
);
export const selectUpdateArticleSuccess = createSelector(
  selectUpdateArticleState,
  fromUpdateArticle.selectSuccess
);
export const selectUpdateArticleError = createSelector(
  selectUpdateArticleState,
  fromUpdateArticle.selectError
);

export const selectDeleteArticleState = createSelector(
  selectFeatureState,
  (state) => state[fromDeleteArticle.deleteArticleFeatureKey]
);
export const selectDeleteArticleSuccess = createSelector(
  selectDeleteArticleState,
  fromDeleteArticle.selectSuccess
);

// 文章详情
export const selectArticleDetailState = createSelector(
  selectFeatureState,
  (state) => state[fromArticleDetail.articleDetailFeatureKey]
);
export const selectArticleDetailLoading = createSelector(
  selectArticleDetailState,
  fromArticleDetail.selectLoading
);
export const selectArticleDetail = createSelector(
  selectArticleDetailState,
  fromArticleDetail.selectArticle
);
export const selectArticleDetailError = createSelector(
  selectArticleDetailState,
  fromArticleDetail.selectError
);

// 发布文章详情
export const selectPublishArticleDetailState = createSelector(
  selectFeatureState,
  (state) => state[fromPublishArticleDetail.publishArticleDetailFeatureKey]
);
export const selectPublishArticleDetailLoading = createSelector(
  selectPublishArticleDetailState,
  fromPublishArticleDetail.selectLoading
);
export const selectPublishArticleDetail = createSelector(
  selectPublishArticleDetailState,
  fromPublishArticleDetail.selectArticle
);
export const selectPublishArticleDetailError = createSelector(
  selectPublishArticleDetailState,
  fromPublishArticleDetail.selectError
);
