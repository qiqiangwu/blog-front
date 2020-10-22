import { createAction, props } from '@ngrx/store';
import { Article } from '../services/backend/backend-api.types';

export const addArticles = createAction(
  '[ArticleListStore] Add Articles',
  props<{ list: Article[] }>()
);

export const updateArticle = createAction(
  '[ArticleListStore] Update Article',
  props<{ article: Partial<Article> }>()
);

export const updateArticles = createAction(
  '[ArticleListStore] Update Articles',
  props<{ articles: Partial<Article>[] }>()
);
