import { createAction, props } from '@ngrx/store';
import {
  Article,
  GetHomeArticleListParams,
} from 'src/app/common/services/backend/backend-api.types';

export const getArticleList = createAction(
  '[HomePage] Get Article List',
  props<{ params: GetHomeArticleListParams; isInit?: boolean }>()
);
export const getArticleListSuccess = createAction(
  '[HomePage] Get Article List Success',
  props<{ list: Article[]; dir: 'next' | 'prev'; pageSize: number }>()
);
export const getArticleListFailure = createAction(
  '[HomePage] Get Article List Failure',
  props<{ error: any }>()
);

// 从缓存中更新文章列表数据
export const updateLocalArticleList = createAction(
  '[HomePage] Update Local Article List'
);
