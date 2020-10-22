import { Injectable } from '@angular/core';
import * as fromRoot from '../../reducers';
import { ArticleListStoreActions } from '../../actions';
import { Article, Catalog } from '../backend/backend-api.types';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import {
  combineLatest,
  filter,
  map,
  take,
  tap,
  withLatestFrom,
} from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ArticleListStoreService {
  constructor(private store: Store<fromRoot.State>) {}

  addArticles(list: Article[]) {
    this.store.dispatch(
      ArticleListStoreActions.addArticles({
        list,
      })
    );
  }

  updateArticle(article: Article) {
    this.store.dispatch(
      ArticleListStoreActions.updateArticle({
        article,
      })
    );
  }

  deleteArticlesByCatalogId(catalogId: string) {
    this.store
      .pipe(
        select(fromRoot.selectAllArticles),
        take(1),
        map((articles) =>
          articles
            .filter(
              (item) =>
                (<Catalog>item.catalog &&
                  (<Catalog>item.catalog).id === catalogId) ||
                item.catalog
            )
            .map((article) => ({
              id: article.id,
              state: 'deleted' as const,
            }))
        )
      )
      .subscribe((articles) => {
        this.store.dispatch(
          ArticleListStoreActions.updateArticles({
            articles: articles,
          })
        );
      });
  }

  updateArticlesCatalog(catalog: Catalog) {
    this.store
      .pipe(
        select(fromRoot.selectAllArticles),
        take(1),
        map((articles) =>
          articles
            .filter((item) => item.catalog.id === catalog.id)
            .map((article) => ({
              id: article.id,
              catalog: catalog,
            }))
        )
      )
      .subscribe((articles) => {
        this.store.dispatch(
          ArticleListStoreActions.updateArticles({
            articles: articles,
          })
        );
      });
  }

  getArticleListByIds(ids$: Observable<string[]>) {
    return ids$.pipe(
      filter((val) => val !== undefined),
      withLatestFrom(
        this.store.pipe(select(fromRoot.selectArticleListStoreEntities))
      ),
      map(([ids, entities]) => {
        let res = [];
        if (ids) {
          ids.forEach((id) => {
            const find = entities[id];
            find && res.push(find);
          });
          res = res.filter((item) => item.state === 'approved');
        }

        return res;
      })
    );
  }

  deleteArticle(articleId: string) {
    this.store.dispatch(
      ArticleListStoreActions.updateArticle({
        article: {
          id: articleId,
          state: 'approved',
        },
      })
    );
  }
}
