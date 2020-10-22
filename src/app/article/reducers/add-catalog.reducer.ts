import { Action, createReducer, on } from '@ngrx/store';
import { PublishArticlePageActions } from '../actions';

export const addCatalogFeatureKey = 'addCatalog';

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
  on(PublishArticlePageActions.addCatalog, (state) => ({
    ...state,
    loading: true,
    success: null,
    error: null,
  })),
  on(PublishArticlePageActions.addCatalogSuccess, (state) => ({
    ...state,
    loading: false,
    success: true,
  })),
  on(PublishArticlePageActions.addCatalogFailure, (state, { error }) => ({
    ...state,
    loading: false,
    success: false,
    error,
  }))
);

export const selectLoading = (state) => state.loading;
export const selectSuccess = (state) => state.success;
export const selectError = (state) => state.error;
