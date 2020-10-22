import { Action, createReducer, on } from '@ngrx/store';
import { Article } from 'src/app/common/services/backend/backend-api.types';
import { PublishArticlePageActions } from '../actions';

export const publishArticleDetailFeatureKey = 'publishArticleDetail';

export interface State {
  loading: boolean;
  article: Article;
  error: string;
}

export const initialState: State = {
  loading: undefined,
  article: undefined,
  error: undefined,
};

export const reducer = createReducer(
  initialState,
  on(PublishArticlePageActions.getArticleDetail, (state) => ({
    loading: true,
    article: null,
    error: null,
  })),
  on(PublishArticlePageActions.loadCatalogList, (state) => ({
    ...initialState,
  })),
  on(
    PublishArticlePageActions.getArticleDetailSuccess,
    (state, { article }) => ({
      ...state,
      loading: false,
      article,
    })
  ),
  on(PublishArticlePageActions.getArticleDetailFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  })),
  on(PublishArticlePageActions.setActiveArticleId, (state, { id }) => ({
    ...state,
    article: id ? state.article : null,
  }))
);

export const selectLoading = (state) => state.loading;
export const selectArticle = (state) => state.article;
export const selectError = (state) => state.error;
