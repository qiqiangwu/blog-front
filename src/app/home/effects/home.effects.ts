import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { exhaustMap, map } from 'rxjs/operators';
import { ArticleListStoreService } from 'src/app/common/services/article-list-store/article-list-store.service';
import { GetHomeArticleListResult } from 'src/app/common/services/backend/backend-api.types';
import { BackendService } from 'src/app/common/services/backend/backend.service';
import { getProblemDescription } from 'src/app/common/utils/api/api-problem';
import { HomePageActions } from '../actions';

@Injectable()
export class HomeEffects {
  getArticleList$ = createEffect(() =>
    this.actions$.pipe(
      ofType(HomePageActions.getArticleList),
      exhaustMap(({ params }) =>
        this.backend.GetHomeArticleList(params).pipe(
          map((result: GetHomeArticleListResult & { errors: any }) => {
            if (result.kind === 'ok') {
              this.articleListStore.addArticles(result.list);
              return HomePageActions.getArticleListSuccess({
                list: result.list,
                dir: params.dir ? params.dir : 'next',
                pageSize: result.pageSize,
              });
            } else {
              let extractErrorsMessage;
              try {
                extractErrorsMessage = result.errors[0].message;
              } catch (e) {}
              return HomePageActions.getArticleListFailure({
                error:
                  extractErrorsMessage ||
                  result.message ||
                  getProblemDescription(result.kind),
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
    private articleListStore: ArticleListStoreService
  ) {}
}
