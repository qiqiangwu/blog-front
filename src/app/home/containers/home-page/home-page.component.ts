import { Component, OnDestroy, OnInit } from '@angular/core';
import * as fromHome from '../../reducers';
import { HomePageActions } from '../../actions';
import { select, Store } from '@ngrx/store';
import { ArticleListStoreService } from 'src/app/common/services/article-list-store/article-list-store.service';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.less'],
})
export class HomePageComponent implements OnInit, OnDestroy {
  ids$ = this.store.pipe(select(fromHome.selectHomeArticleListIds));
  isInit$ = this.store.pipe(select(fromHome.selectHomeArticleListIsInit));
  noMore$ = this.store.pipe(select(fromHome.selectHomeArticleListNoMore));

  articles$;

  updateSubscription;

  constructor(
    private store: Store<fromHome.State>,
    private articleListStore: ArticleListStoreService,
    private router: Router
  ) {
    this.articles$ = this.articleListStore.getArticleListByIds(this.ids$);

    this.updateSubscription = this.router.events
      .pipe(filter((events) => events instanceof NavigationEnd))
      .subscribe(() => {
        this.store.dispatch(HomePageActions.updateLocalArticleList());
      });
  }

  ngOnInit(): void {
    this.store.dispatch(
      HomePageActions.getArticleList({
        params: {
          pageSize: 10,
        },
      })
    );
  }

  ngOnDestroy(): void {
    this.updateSubscription.unsubscribe();
  }

  onLoadMore(event) {
    this.store.dispatch(
      HomePageActions.getArticleList({
        params: {
          pageSize: 10,
          id: event.id,
          dir: event.dir,
        },
      })
    );
  }
}
