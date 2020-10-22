import { createAction, props } from '@ngrx/store';
import { Article } from 'src/app/common/services/backend/backend-api.types';

export const getArticleDetail = createAction(
  '[ArticleDetailPage] Get Article Detail',
  props<{ id: string }>()
);
export const getArticleDetailSuccess = createAction(
  '[ArticleDetailPage] Get Article Detail Success',
  props<{ article: Article }>()
);
export const getArticleDetailFailure = createAction(
  '[ArticleDetailPage] Get Article Detail Failure',
  props<{ error: any }>()
);
