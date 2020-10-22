import { createAction, props } from '@ngrx/store';
import {
  Article,
  Catalog,
  CreateArticleParams,
  GetArticleListParams,
  UpdateArticleParams,
  UpdateCatalogParams,
} from 'src/app/common/services/backend/backend-api.types';

export const loadCatalogList = createAction(
  '[PublishArticlePage] Load Catalog List'
);

export const loadCatalogListSuccess = createAction(
  '[PublishArticlePage] Load Catalog List Success',
  props<{ list: Catalog[] }>()
);

export const loadCatalogListFailure = createAction(
  '[PublishArticlePage] Load Catalog List Failure',
  props<{ error: any }>()
);

export const addCatalog = createAction(
  '[PublishArticlePage] Add Catalog',
  props<{ name: string }>()
);
export const addCatalogSuccess = createAction(
  '[PublishArticlePage] Add Catalog Success',
  props<{ catalog: Catalog }>()
);
export const addCatalogFailure = createAction(
  '[PublishArticlePage] Add Catalog Failure',
  props<{ error: any }>()
);

export const updateCatalog = createAction(
  '[PublishArticlePage] Update Catalog',
  props<{ params: UpdateCatalogParams }>()
);
export const updateCatalogSuccess = createAction(
  '[PublishArticlePage] Update Catalog Success'
);
export const updateCatalogFailure = createAction(
  '[PublishArticlePage] Update Catalog Failure',
  props<{ error: any }>()
);

export const deleteCatalog = createAction(
  '[PublishArticlePage] Delete Catalog',
  props<{ id: string }>()
);
export const deleteCatalogSuccess = createAction(
  '[PublishArticlePage] Delete Catalog Success',
  props<{ id: string }>()
);
export const deleteCatalogFailure = createAction(
  '[PublishArticlePage] Delete Catalog Failure',
  props<{ error: any }>()
);

export const updateLocalCatalog = createAction(
  '[PublishArticlePage] Update Local Catalog',
  props<{ catalog: Catalog }>()
);

export const selectActiveCatalogId = createAction(
  '[PublishArticlePage] Set Active Catalog Id',
  props<{ id: string }>()
);

export const getArticleList = createAction(
  '[PublishArticlePage] Get Article List',
  props<{ params: GetArticleListParams; isInit?: boolean }>()
);
export const getArticleListSuccess = createAction(
  '[PublishArticlePage] Get Article List Success',
  props<{ list: Article[]; pageSize: number; count: number }>()
);
export const getArticleListFailure = createAction(
  '[PublishArticlePage] Get Article List Failure',
  props<{ error: any }>()
);

export const setActiveArticleId = createAction(
  '[PublishArticlePage] Set Active Article Id',
  props<{ id: string }>()
);

export const createArticle = createAction(
  '[PublishArticlePage] Create Article',
  props<{ params: CreateArticleParams }>()
);
export const createArticleSuccess = createAction(
  '[PublishArticlePage] Create Article Success',
  props<{ article: Article }>()
);
export const createArticleFailure = createAction(
  '[PublishArticlePage] Create Article Failure',
  props<{ error: any }>()
);

export const upateArticle = createAction(
  '[PublishArticlePage] Update Article',
  props<{ id: string; params: UpdateArticleParams }>()
);
export const updateArticleSuccess = createAction(
  '[PublishArticlePage] Update Article Success',
  props<{ article: Article }>()
);
export const updateArticleFailure = createAction(
  '[PublishArticlePage] Update Article Failure',
  props<{ error: any }>()
);

export const deleteArtile = createAction(
  '[PublishArticlePage] Delete Article',
  props<{ id: string }>()
);
export const deleteArtileSuccess = createAction(
  '[PublishArticlePage] Delete Article Success',
  props<{ id: string }>()
);
export const deleteArtileFailure = createAction(
  '[PublishArticlePage] Delete Article Failure',
  props<{ error: any }>()
);

// 获取选中文章详情
export const getArticleDetail = createAction(
  '[PublishArticlePage] Get Article Detail',
  props<{ id: string }>()
);
export const getArticleDetailSuccess = createAction(
  '[PublishArticlePage] Get Article Detail Success',
  props<{ article: Article }>()
);
export const getArticleDetailFailure = createAction(
  '[PublishArticlePage] Get Article Detail Failure',
  props<{ error: any }>()
);
