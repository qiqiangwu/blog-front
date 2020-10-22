import { Injectable } from '@angular/core';
import * as fromArticle from '../../reducers';
import { PublishArticlePageActions } from '../../actions';
import { select, Store } from '@ngrx/store';
import { filter, take } from 'rxjs/operators';
import { NzMessageService } from 'ng-zorro-antd/message';

@Injectable({
  providedIn: 'root',
})
export class ArticleService {
  constructor(
    private store: Store<fromArticle.State>,
    private message: NzMessageService
  ) {}

  updateCatalog(catalogId: string, name: string) {
    this.store.dispatch(
      PublishArticlePageActions.updateCatalog({
        params: {
          id: catalogId,
          name,
        },
      })
    );

    this.store
      .pipe(
        select(fromArticle.selectUpdateCatalogSuccess),
        filter((val) => val != null),
        take(1)
      )
      .subscribe((success) => {
        if (success) {
          this.message.create('success', '更新成功');

          this.store.dispatch(
            PublishArticlePageActions.updateLocalCatalog({
              catalog: {
                id: catalogId,
                name,
              },
            })
          );
        }
      });
  }

  deleteCatalog(catalogId: string) {
    this.store.dispatch(
      PublishArticlePageActions.deleteCatalog({
        id: catalogId,
      })
    );
  }

  deleteArticle(articleId: string) {
    this.store.dispatch(
      PublishArticlePageActions.deleteArtile({
        id: articleId,
      })
    );
  }

  /**
   *
   * @param id 文章id
   */
  getPublishArticle(id: string) {
    this.store.dispatch(
      PublishArticlePageActions.getArticleDetail({
        id,
      })
    );
  }
}
