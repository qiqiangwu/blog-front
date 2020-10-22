import {
  trigger,
  state,
  style,
  transition,
  animate,
} from '@angular/animations';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Observable } from 'rxjs';
import { filter, map, take, tap, withLatestFrom } from 'rxjs/operators';
import { ArticleListStoreService } from 'src/app/common/services/article-list-store/article-list-store.service';
import { Article } from 'src/app/common/services/backend/backend-api.types';
import { NavigateService } from 'src/app/common/services/navigate/navigate.service';
import { PublishArticlePageActions } from '../../actions';
import * as fromArticle from '../../reducers';

@Component({
  selector: 'app-publish-article-page',
  templateUrl: './publish-article-page.component.html',
  styleUrls: ['./publish-article-page.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('addCatalogPanelTrigger', [
      transition(':enter', [
        style({
          top: '-100%',
        }),
        animate(
          '500ms',
          style({
            top: '*',
          })
        ),
      ]),
      transition(':leave', [
        animate(
          '500ms',
          style({
            top: '-100%',
          })
        ),
      ]),
    ]),
    trigger('addCatalogButtonTrigger', [
      transition(':enter', [
        style({
          top: '100%',
        }),
        animate(
          '500ms',
          style({
            top: '*',
          })
        ),
      ]),
      transition(':leave', [
        animate(
          '500ms',
          style({
            top: '100%',
          })
        ),
      ]),
    ]),
  ],
})
export class PublishArticlePageComponent implements OnInit {
  catalogLoading$ = this.store.pipe(
    select(fromArticle.selectCatalogListLoading)
  );
  catalogList$ = this.store.pipe(select(fromArticle.selectCatalogList));
  catalogError$ = this.store.pipe(select(fromArticle.selectCatalogListError));
  activeCatalogId$ = this.store.pipe(
    select(fromArticle.selectCatalogListActiveId)
  );
  activeCatalog$ = this.store.pipe(select(fromArticle.selectActiveCatalog));

  addCatalogSuccess$ = this.store.pipe(
    select(fromArticle.selectAddCatalogSuccess)
  );
  addCatalogError$ = this.store.pipe(select(fromArticle.selectAddCatalogError));

  publishArticleListIds$ = this.store.pipe(
    select(fromArticle.selectPublishArticleIds)
  );
  activeArticleId$ = this.store.pipe(
    select(fromArticle.selectPublishArticleListActiveId)
  );
  activeArticle$ = this.store.pipe(
    select(fromArticle.selectPublishArticleDetail)
  );
  publishArticleListIsInit$ = this.store.pipe(
    select(fromArticle.selectPublishArticleListIsInit)
  );
  publishArticleListNoMore$ = this.store.pipe(
    select(fromArticle.selectPublishArticleListNoMore)
  );

  updateArticleSuccess$ = this.store.pipe(
    select(fromArticle.selectUpdateArticleSuccess)
  );

  publishArticleList$: Observable<Article[]>;

  flagAddCatalog = false;

  constructor(
    private navigate: NavigateService,
    private store: Store<fromArticle.State>,
    private message: NzMessageService,
    private articleListStore: ArticleListStoreService
  ) {
    this.publishArticleList$ = this.articleListStore.getArticleListByIds(
      this.publishArticleListIds$
    );
  }

  ngOnInit(): void {
    this.store.dispatch(PublishArticlePageActions.loadCatalogList());
    this.initArticleList();
  }

  backHome() {
    this.navigate.back();
  }

  openCatalogPanel() {
    this.flagAddCatalog = true;
  }

  onCancelAddCatalog() {
    this.flagAddCatalog = false;
  }

  addCatalog(event) {
    this.store.dispatch(
      PublishArticlePageActions.addCatalog({
        name: event.name,
      })
    );

    this.addCatalogSuccess$
      .pipe(
        filter((val) => val != null),
        take(1)
      )
      .subscribe((success) => {
        if (success) {
          this.flagAddCatalog = false;
        }
      });
    this.addCatalogError$
      .pipe(
        filter((val) => val != null),
        take(1)
      )
      .subscribe((error) => {
        this.message.create('error', error);
      });
  }

  activeCatalogChange(id: string) {
    this.store.dispatch(
      PublishArticlePageActions.selectActiveCatalogId({ id })
    );
    this.store.dispatch(
      PublishArticlePageActions.setActiveArticleId({ id: null })
    );

    this.getArticleListByCatalog(id, 10, true);
  }

  activeArticleChange(id: string) {
    this.store.dispatch(PublishArticlePageActions.setActiveArticleId({ id }));
  }

  createArticle(title?: string) {
    this.activeCatalog$
      .pipe(
        filter((val) => val != null),
        take(1)
      )
      .subscribe((catalog) => {
        if (catalog) {
          this.store.dispatch(
            PublishArticlePageActions.createArticle({
              params: {
                title: title || '添加标题',
                state: 'approved',
                catalog: catalog,
              },
            })
          );
        }
      });
  }

  publish(event) {
    this.activeCatalog$.pipe(take(1)).subscribe((catalog) => {
      this.store.dispatch(
        PublishArticlePageActions.upateArticle({
          id: event.id,
          params: {
            title: event.title,
            content: event.content,
            catalog: catalog,
            state: 'approved',
          },
        })
      );
    });

    this.updateArticleSuccess$
      .pipe(
        filter((val) => val != null),
        take(1)
      )
      .subscribe((success) => {
        if (success) {
          this.message.create('success', '文章更新成功');
        }
      });
  }

  onLoadMoreArticleList(event) {
    this.activeCatalogId$
      .pipe(
        filter((val) => val != null),
        withLatestFrom(this.publishArticleList$),
        take(1)
      )
      .subscribe(([catalogId, list]) => {
        this.getArticleListByCatalog(
          catalogId,
          10,
          false,
          list[list.length - 1].id
        );
      });
  }

  private initArticleList() {
    this.activeCatalogId$
      .pipe(
        filter((val) => val != null),
        take(1)
      )
      .subscribe((catalogId) => {
        this.getArticleListByCatalog(catalogId, 10, true);
      });
  }

  private getArticleListByCatalog(
    catalogId: string,
    pageSize: number,
    isInit: boolean,
    lastArticleId?: string
  ) {
    this.store.dispatch(
      PublishArticlePageActions.getArticleList({
        params: {
          catalogId: catalogId,
          pageSize,
          lastArticleId,
        },
        isInit: isInit,
      })
    );
  }
}
