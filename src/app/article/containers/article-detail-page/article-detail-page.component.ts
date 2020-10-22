import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import * as fromArticle from '../../reducers';
import { ArticleDetailPageActions } from '../../actions';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-article-detail-page',
  templateUrl: './article-detail-page.component.html',
  styleUrls: ['./article-detail-page.component.less'],
})
export class ArticleDetailPageComponent implements OnInit {
  article$ = this.store.pipe(select(fromArticle.selectArticleDetail));

  constructor(
    private store: Store<fromArticle.State>,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.store.dispatch(
      ArticleDetailPageActions.getArticleDetail({
        id: this.activatedRoute.snapshot.paramMap.get('id'),
      })
    );
  }
}
