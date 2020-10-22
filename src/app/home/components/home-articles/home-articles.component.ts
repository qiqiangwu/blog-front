import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { Router } from '@angular/router';
import { Logger } from '@nsalaun/ng-logger';
import { Article } from 'src/app/common/services/backend/backend-api.types';

@Component({
  selector: 'app-home-articles',
  templateUrl: './home-articles.component.html',
  styleUrls: ['./home-articles.component.less'],
})
export class HomeArticlesComponent implements OnInit, OnChanges {
  private static readonly TAG = 'HomeArticlesComponent';

  @Input() articles: Article[];
  @Input() isInit: boolean;
  @Input() noMore: boolean;

  @Output() loadmore = new EventEmitter<any>();

  constructor(private logger: Logger, private router: Router) {}

  ngOnInit(): void {}

  ngOnChanges(sc: SimpleChanges) {
    if (sc && sc.articles && sc.articles.currentValue) {
      this.logger.debug(
        `${HomeArticlesComponent.TAG} article changes: ${JSON.stringify(
          this.articles
        )}`
      );
    }
  }

  onLoadMore() {
    this.loadmore.emit({
      dir: 'next',
      id: this.articles[this.articles.length - 1].id,
    });
  }

  openArticle(id, title) {
    this.router.navigate(['/article', id, title]);
  }
}
