import { Action, createReducer, on } from '@ngrx/store';
import { PublishArticlePageActions } from '../actions';

export const updateArticleFeatureKey = 'updateArticle';

export interface State {
  loading: boolean;
  success: boolean;
  error: string;
}

export const initialState: State = {
  loading: undefined,
  success: undefined,
  error: undefined,
};

export const reducer = createReducer(
  initialState,
  on(PublishArticlePageActions.upateArticle, (state) => ({
    ...state,
    loading: true,
    success: null,
    error: null,
  })),
  on(PublishArticlePageActions.updateArticleSuccess, (state) => ({
    ...state,
    loading: false,
    success: true,
  })),
  on(PublishArticlePageActions.updateArticleFailure, (state, { error }) => ({
    ...state,
    loading: false,
    success: false,
    error,
  }))
);

export const selectLoading = (state) => state.loading;
export const selectSuccess = (state) => state.success;
export const selectError = (state) => state.error;
