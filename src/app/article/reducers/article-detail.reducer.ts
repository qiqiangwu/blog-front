import { Action, createReducer, on } from '@ngrx/store';
import { Article } from 'src/app/common/services/backend/backend-api.types';
import { ArticleDetailPageActions } from '../actions';

export const articleDetailFeatureKey = 'articleDetail';

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
  on(ArticleDetailPageActions.getArticleDetail, (state) => ({
    loading: true,
    article: null,
    error: null,
  })),
  on(
    ArticleDetailPageActions.getArticleDetailSuccess,
    (state, { article }) => ({
      ...state,
      loading: false,
      article,
    })
  ),
  on(ArticleDetailPageActions.getArticleDetailFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  }))
);

export const selectLoading = (state) => state.loading;
export const selectArticle = (state) => state.article;
export const selectError = (state) => state.error;
