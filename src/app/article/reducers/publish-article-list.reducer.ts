import { Action, createReducer, on } from '@ngrx/store';
import { Article } from 'src/app/common/services/backend/backend-api.types';
import { PublishArticlePageActions } from '../actions';

export const publishArticleListFeatureKey = 'publishArticleList';

export interface State {
  isInit: boolean;
  loading: boolean;
  ids: string[];
  error: string;
  activeId: string;
  nomore: boolean;
}

export const initialState: State = {
  isInit: undefined,
  loading: undefined,
  ids: undefined,
  error: undefined,
  activeId: undefined,
  nomore: undefined,
};

export const reducer = createReducer(
  initialState,
  on(PublishArticlePageActions.loadCatalogList, (state) => ({
    ...state,
    activeId: null,
  })),
  on(PublishArticlePageActions.getArticleList, (state, { isInit = false }) => ({
    ...state,
    loading: true,
    error: null,
    isInit,
    ids: isInit ? null : state.ids,
    activeId: null,
  })),
  on(
    PublishArticlePageActions.getArticleListSuccess,
    (state, { list, pageSize, count }) => {
      let len = state.ids ? state.ids.length : 0;
      len = len + list.length;

      return {
        ...state,
        loading: false,
        isInit: false,
        ids: state.ids
          ? [...state.ids, ...list.map((item) => item.id)]
          : [...list.map((item) => item.id)],
        activeId: Array.isArray(list) && list.length ? list[0].id : null,
        nomore: list.length < pageSize || len === count,
      };
    }
  ),
  on(PublishArticlePageActions.getArticleListFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
    isInit: false,
  })),
  on(PublishArticlePageActions.setActiveArticleId, (state, { id }) => ({
    ...state,
    activeId: id,
  })),
  on(PublishArticlePageActions.getArticleList, (state, { isInit }) => ({
    ...state,
    activeId: isInit ? null : state.activeId,
  })),
  on(PublishArticlePageActions.createArticleSuccess, (state, { article }) => ({
    ...state,
    ids: state.ids ? [article.id, ...state.ids] : [article.id],
    activeId: article.id,
  })),
  on(PublishArticlePageActions.updateArticleSuccess, (state, { article }) => ({
    ...state,
    ids: [...state.ids],
  })),
  on(PublishArticlePageActions.deleteCatalogSuccess, (state) => ({
    ...state,
    ids: null,
    activeId: null,
    nomore: null,
  })),
  on(PublishArticlePageActions.deleteArtileSuccess, (state, { id }) => {
    const ids = [...state.ids];
    ids.splice(
      ids.findIndex((item) => item === id),
      1
    );
    return {
      ...state,
      ids,
      activeId: ids && ids.length ? ids[0] : null,
    };
  })
);

export const selectLoading = (state) => state.loading;
export const selectIds = (state) => state.ids;
export const selectError = (state) => state.error;
export const selectActiveId = (state) => state.activeId;
export const selectIsInit = (state) => state.isInit;
export const selectNoMore = (state) => state.nomore;
