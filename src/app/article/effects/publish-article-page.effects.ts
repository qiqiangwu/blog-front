import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { exhaustMap, map, withLatestFrom } from 'rxjs/operators';
import { ArticleListStoreService } from 'src/app/common/services/article-list-store/article-list-store.service';
import {
  AddCatalogResult,
  CreateArticleResult,
  DeleteArticleResult,
  DeleteCatalogResult,
  GetArticleDetailResult,
  GetArticleListResult,
  GetCatalogListResult,
  UpdateArticleResult,
  UpdateCatalogResult,
} from 'src/app/common/services/backend/backend-api.types';
import { BackendService } from 'src/app/common/services/backend/backend.service';
import { getProblemDescription } from 'src/app/common/utils/api/api-problem';
import { UserService } from 'src/app/user/services/user/user.service';
import {
  PublishArticlePageActions,
  ArticleDetailPageActions,
} from '../actions';

@Injectable()
export class PublishArticlePageEffects {
  loadCatalogList$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PublishArticlePageActions.loadCatalogList),
      exhaustMap(() =>
        this.backend.getCatalogList().pipe(
          map((result: GetCatalogListResult) => {
            if (result.kind === 'ok') {
              return PublishArticlePageActions.loadCatalogListSuccess({
                list: result.list,
              });
            } else {
              return PublishArticlePageActions.loadCatalogListFailure({
                error: result.message || getProblemDescription(result.kind),
              });
            }
          })
        )
      )
    )
  );

  addCatalog$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PublishArticlePageActions.addCatalog),
      exhaustMap(({ name }) =>
        this.backend.addCatalog(name).pipe(
          map((result: AddCatalogResult) => {
            if (result.kind === 'ok') {
              return PublishArticlePageActions.addCatalogSuccess({
                catalog: result.catalog,
              });
            } else {
              return PublishArticlePageActions.addCatalogFailure({
                error: result.message || getProblemDescription(result.kind),
              });
            }
          })
        )
      )
    )
  );

  updateCatalog$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PublishArticlePageActions.updateCatalog),
      exhaustMap(({ params }) =>
        this.backend.updateCatalog(params).pipe(
          map((result: UpdateCatalogResult) => {
            if (result.kind === 'ok') {
              this.articleListStore.updateArticlesCatalog(params);

              return PublishArticlePageActions.updateCatalogSuccess();
            } else {
              return PublishArticlePageActions.updateCatalogFailure({
                error: result.message || getProblemDescription(result.kind),
              });
            }
          })
        )
      )
    )
  );

  deleteCatalog$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PublishArticlePageActions.deleteCatalog),
      exhaustMap(({ id }) =>
        this.backend.deleteCatalog(id).pipe(
          map((result: DeleteCatalogResult) => {
            if (result.kind === 'ok') {
              this.articleListStore.deleteArticlesByCatalogId(id);

              return PublishArticlePageActions.deleteCatalogSuccess({ id });
            } else {
              return PublishArticlePageActions.deleteCatalogFailure({
                error: result.message || getProblemDescription(result.kind),
              });
            }
          })
        )
      )
    )
  );

  getArticleList$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PublishArticlePageActions.getArticleList),
      exhaustMap(({ params }) =>
        this.backend.GetArticleList(params).pipe(
          map((result: GetArticleListResult) => {
            if (result.kind === 'ok') {
              this.articleListStore.addArticles(result.list);

              return PublishArticlePageActions.getArticleListSuccess({
                list: result.list,
                pageSize: result.pageSize,
                count: result.count,
              });
            } else {
              return PublishArticlePageActions.getArticleListFailure({
                error: result.message || getProblemDescription(result.kind),
              });
            }
          })
        )
      )
    )
  );

  createArticle$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PublishArticlePageActions.createArticle),
      withLatestFrom(this.userService.getUser()),
      exhaustMap(([{ params }, user]) =>
        this.backend.createArticle(params).pipe(
          map((result: CreateArticleResult) => {
            if (result.kind === 'ok') {
              const article = {
                ...result.article,
                author: { name: user.name, id: user.id },
              };

              this.articleListStore.addArticles([article]);
              return PublishArticlePageActions.createArticleSuccess({
                article: article,
              });
            } else {
              return PublishArticlePageActions.createArticleFailure({
                error: result.message || getProblemDescription(result.kind),
              });
            }
          })
        )
      )
    )
  );

  updateArticle$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PublishArticlePageActions.upateArticle),
      withLatestFrom(this.userService.getUser()),
      exhaustMap(([{ id, params }, user]) =>
        this.backend.updateArticle(id, params).pipe(
          map((result: UpdateArticleResult) => {
            if (result.kind === 'ok') {
              const updatedArticle = {
                ...params,
                id,
                author: { name: user.name, id: user.id },
              };
              this.articleListStore.updateArticle(updatedArticle);
              return PublishArticlePageActions.updateArticleSuccess({
                article: updatedArticle,
              });
            } else {
              return PublishArticlePageActions.updateArticleFailure({
                error: result.message || getProblemDescription(result.kind),
              });
            }
          })
        )
      )
    )
  );

  deleteArticle$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PublishArticlePageActions.deleteArtile),
      exhaustMap(({ id }) =>
        this.backend.deleteArticle(id).pipe(
          map((result: DeleteArticleResult) => {
            if (result.kind === 'ok') {
              this.articleListStore.deleteArticle(id);

              return PublishArticlePageActions.deleteArtileSuccess({ id });
            } else {
              return PublishArticlePageActions.deleteArtileFailure({
                error: result.message || getProblemDescription(result.kind),
              });
            }
          })
        )
      )
    )
  );

  getArticle$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ArticleDetailPageActions.getArticleDetail),
      exhaustMap(({ id }) =>
        this.backend.getArticleDetail(id).pipe(
          map((result: GetArticleDetailResult) => {
            if (result.kind === 'ok') {
              return ArticleDetailPageActions.getArticleDetailSuccess({
                article: result.article,
              });
            } else {
              return ArticleDetailPageActions.getArticleDetailFailure({
                error: result.message || getProblemDescription(result.kind),
              });
            }
          })
        )
      )
    )
  );

  getPublishArticle$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PublishArticlePageActions.getArticleDetail),
      exhaustMap(({ id }) =>
        this.backend.getArticleDetail(id).pipe(
          map((result: GetArticleDetailResult) => {
            if (result.kind === 'ok') {
              return PublishArticlePageActions.getArticleDetailSuccess({
                article: result.article,
              });
            } else {
              return PublishArticlePageActions.getArticleDetailFailure({
                error: result.message || getProblemDescription(result.kind),
              });
            }
          })
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private backend: BackendService,
    private articleListStore: ArticleListStoreService,
    private userService: UserService
  ) {}
}
