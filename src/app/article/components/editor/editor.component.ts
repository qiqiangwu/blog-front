import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { Article } from 'src/app/common/services/backend/backend-api.types';
import { ArticleService } from '../../services/article/article.service';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.less'],
})
export class EditorComponent implements OnInit, OnChanges {
  @Input() id: string;
  @Input() article: Article;
  @Output() publish = new EventEmitter<any>();

  title: string;

  content: string;

  constructor(private articleService: ArticleService) {}

  ngOnInit(): void {
  }

  ngOnChanges(sc: SimpleChanges) {
    if (sc && sc.id && sc.id.currentValue) {
      this.articleService.getPublishArticle(this.id);
    }
    if (sc && sc.article && sc.article.currentValue) {
      this.title = this.article.title;
      this.content = this.article.content;
    }
  }

  onSubmit() {
    this.publish.emit({
      id: this.article.id,
      title: this.title,
      content: this.content,
    });
  }
}
