import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { Action, createReducer, on } from '@ngrx/store';
import { Article } from '../services/backend/backend-api.types';
import { ArticleListStoreActions } from '../actions';
import { PublishArticlePageActions } from 'src/app/article/actions';

export const articleListStoreFeatureKey = 'articleListStore';

export interface State extends EntityState<Article> {}

export const adapter: EntityAdapter<Article> = createEntityAdapter<Article>({
  selectId: (article) => article.id,
});

export const initialState: State = adapter.getInitialState();

export const reducer = createReducer(
  initialState,
  on(ArticleListStoreActions.addArticles, (state, { list }) =>
    adapter.addMany(list, state)
  ),
  on(ArticleListStoreActions.updateArticle, (state, { article }) =>
    adapter.updateOne(
      {
        id: article.id,
        changes: {
          ...article,
        },
      },
      state
    )
  ),
  on(ArticleListStoreActions.updateArticles, (state, { articles }) =>
    adapter.updateMany(
      articles.map((article) => ({
        id: article.id,
        changes: {
          ...article,
        },
      })),
      state
    )
  )
);

const { selectEntities, selectAll } = adapter.getSelectors();

export const selectArticleEntities = selectEntities;
export const selectAllArticles = selectAll;
