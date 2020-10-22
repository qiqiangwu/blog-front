import { Action, createReducer, on } from '@ngrx/store';
import { Catalog } from 'src/app/common/services/backend/backend-api.types';
import { PublishArticlePageActions } from '../actions';

export const catalogListFeatureKey = 'catalogList';

export interface State {
  loading: boolean;
  list: Catalog[];
  error: string;
  activeId: string;
}

export const initialState: State = {
  loading: undefined,
  list: undefined,
  error: undefined,
  activeId: undefined,
};

export const reducer = createReducer(
  initialState,
  on(PublishArticlePageActions.loadCatalogList, (state) => ({
    ...state,
    loading: true,
    list: null,
    error: null,
    activeId: null,
  })),
  on(PublishArticlePageActions.loadCatalogListSuccess, (state, { list }) => ({
    ...state,
    loading: false,
    list,
    activeId: Array.isArray(list) && list.length ? list[0].id : null,
  })),
  on(PublishArticlePageActions.loadCatalogListFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),
  on(PublishArticlePageActions.addCatalogSuccess, (state, { catalog }) => ({
    ...state,
    list: !state.list ? [catalog] : [catalog, ...state.list],
    activeId: !state.activeId ? catalog.id : state.activeId,
  })),
  on(PublishArticlePageActions.selectActiveCatalogId, (state, { id }) => ({
    ...state,
    activeId: id,
  })),
  on(PublishArticlePageActions.updateLocalCatalog, (state, { catalog }) => {
    const list = [...state.list];
    list.splice(
      list.findIndex((item) => item.id === catalog.id),
      1,
      catalog
    );

    return {
      ...state,
      list,
    };
  }),
  on(PublishArticlePageActions.deleteCatalogSuccess, (state, { id }) => {
    const list = [...state.list];
    list.splice(
      list.findIndex((item) => item.id === id),
      1
    );

    return {
      ...state,
      list,
      activeId: list.length === 0 ? null : list[0].id,
    };
  })
);

export const selectLoading = (state) => state.loading;
export const selectList = (state) => state.list;
export const selectError = (state) => state.error;
export const selectActiveId = (state) => state.activeId;
