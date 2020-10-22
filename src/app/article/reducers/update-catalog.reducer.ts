import { Action, createReducer, on } from '@ngrx/store';
import { PublishArticlePageActions } from '../actions';

export const updateCatalogFeatureKey = 'updateCatalog';

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
  on(PublishArticlePageActions.updateCatalog, (state) => ({
    loading: true,
    success: undefined,
    error: undefined,
  })),
  on(PublishArticlePageActions.updateCatalogSuccess, (state) => ({
    ...state,
    loading: false,
    success: true,
  })),
  on(PublishArticlePageActions.updateCatalogFailure, (state, { error }) => ({
    ...state,
    loading: false,
    success: false,
    error,
  }))
);

export const selectLoading = (state) => state.loading;
export const selectSuccess = (state) => state.success;
export const selectError = (state) => state.error;