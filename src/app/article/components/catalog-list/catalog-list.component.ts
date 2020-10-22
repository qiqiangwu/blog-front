import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewContainerRef,
} from '@angular/core';
import { Catalog } from 'src/app/common/services/backend/backend-api.types';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { AddCatalogComponent } from '../add-catalog/add-catalog.component';
import { ArticleService } from '../../services/article/article.service';
import { act } from '@ngrx/effects';

@Component({
  selector: 'app-catalog-list',
  templateUrl: './catalog-list.component.html',
  styleUrls: ['./catalog-list.component.less'],
})
export class CatalogListComponent implements OnInit {
  @Input() list: Catalog[];
  @Input() activeId: string;

  @Output() itemClick = new EventEmitter<string>();
  constructor(
    private modal: NzModalService,
    private viewContainerRef: ViewContainerRef,
    private articleService: ArticleService
  ) {}

  ngOnInit(): void {}

  onItemClick(id: string) {
    this.itemClick.emit(id);
  }

  updateCatalog() {
    const modal = this.modal.create({
      nzTitle: '更新文章类别',
      nzContent: AddCatalogComponent,
      nzViewContainerRef: this.viewContainerRef,
      nzFooter: null,
    });
    const instance = modal.getContentComponent();

    const activeCatalog = this.list.find((item) => item.id === this.activeId);
    instance.name = activeCatalog && activeCatalog.name;

    instance.cancel.subscribe(() => {
      modal.destroy();
    });
    instance.add.subscribe((event) => {
      this.articleService.updateCatalog(this.activeId, event.name);

      modal.destroy();
    });
  }

  deleteCatalog() {
    this.articleService.deleteCatalog(this.activeId);
  }
}
