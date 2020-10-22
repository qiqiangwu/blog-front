import { Component, Input, OnInit } from '@angular/core';
import { Article } from 'src/app/common/services/backend/backend-api.types';

@Component({
  selector: 'app-article-detail',
  templateUrl: './article-detail.component.html',
  styleUrls: ['./article-detail.component.less'],
})
export class ArticleDetailComponent implements OnInit {
  @Input() article: Article;
  constructor() {}

  ngOnInit(): void {}
}
