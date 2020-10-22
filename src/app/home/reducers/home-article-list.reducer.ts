import { Action, createReducer, on } from '@ngrx/store';
import { HomePageActions } from '../actions';

export const homeArticleListFeatureKey = 'homeArticleList';

export interface State {
  isInit: boolean;
  loading: boolean;
  ids: string[];
  error: string;
  nomore: boolean;
}

export const initialState: State = {
  isInit: undefined,
  loading: undefined,
  ids: undefined,
  error: undefined,
  nomore: undefined,
};

export const reducer = createReducer(
  initialState,
  on(HomePageActions.getArticleList, (state, { isInit = false }) => ({
    ...state,
    loading: true,
    errors: null,
    isInit,
  })),
  on(
    HomePageActions.getArticleListSuccess,
    (state, { list, dir, pageSize }) => ({
      ...state,
      loading: false,
      isInit: false,
      ids: state.ids
        ? dir === 'prev'
          ? [...list.map((item) => item.id), ...state.ids]
          : [...state.ids, ...list.map((item) => item.id)]
        : [...list.map((item) => item.id)],
      nomore: list.length < pageSize,
    })
  ),
  on(HomePageActions.getArticleListFailure, (state, { error }) => ({
    ...state,
    isInit: false,
    error,
  })),
  on(HomePageActions.updateLocalArticleList, (state) => ({
    ...state,
    ids: state.ids ? [...state.ids] : state.ids,
  }))
);

export const selectLoading = (state) => state.loading;
export const selectIds = (state) => state.ids;
export const selectError = (state) => state.error;
export const selectIsInit = (state) => state.isInit;
export const selectNoMore = (state) => state.nomore;
