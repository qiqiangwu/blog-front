import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Article } from 'src/app/common/services/backend/backend-api.types';
import { ArticleService } from '../../services/article/article.service';

@Component({
  selector: 'app-publish-article-list',
  templateUrl: './publish-article-list.component.html',
  styleUrls: ['./publish-article-list.component.less'],
})
export class PublishArticleListComponent implements OnInit {
  @Input() list: Article[];
  @Input() activeId: string;
  @Input() isInit: boolean;
  @Input() noMore: boolean;

  @Output() itemClick = new EventEmitter<string>();
  @Output() loadmore = new EventEmitter<any>();

  constructor(private articleService: ArticleService) {}

  ngOnInit(): void {}

  onItemClick(id: string) {
    this.itemClick.emit(id);
  }

  onLoadMore() {
    this.loadmore.emit({
      id: this.list[this.list.length - 1].id,
    });
  }

  deleteArticle() {
    this.articleService.deleteArticle(this.activeId);
  }
}
