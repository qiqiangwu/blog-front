import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ArticleRoutingModule } from './article-routing.module';
import { PublishArticlePageComponent } from './containers/publish-article-page/publish-article-page.component';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { StoreModule } from '@ngrx/store';
import * as fromArticle from './reducers';
import { EffectsModule } from '@ngrx/effects';
import { PublishArticlePageEffects } from './effects/publish-article-page.effects';
import { CatalogListComponent } from './components/catalog-list/catalog-list.component';
import { NzListModule } from 'ng-zorro-antd/list';
import { AddCatalogComponent } from './components/add-catalog/add-catalog.component';
import { NzInputModule } from 'ng-zorro-antd/input';
import { FormsModule } from '@angular/forms';
import { NzMessageModule } from 'ng-zorro-antd/message';
import { PublishArticleListComponent } from './components/publish-article-list/publish-article-list.component';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzModalModule } from 'ng-zorro-antd/modal';
// 引入你需要的图标，比如你需要 fill 主题的 AccountBook Alert 和 outline 主题的 Alert，推荐 ✔️
import { PlusOutline } from '@ant-design/icons-angular/icons';
import { EditorComponent } from './components/editor/editor.component';
import { QuillModule } from 'ngx-quill';
import { ArticleDetailPageComponent } from './containers/article-detail-page/article-detail-page.component';
import { ArticleDetailComponent } from './components/article-detail/article-detail.component';

@NgModule({
  declarations: [
    PublishArticlePageComponent,
    CatalogListComponent,
    AddCatalogComponent,
    PublishArticleListComponent,
    EditorComponent,
    ArticleDetailPageComponent,
    ArticleDetailComponent,
  ],
  imports: [
    CommonModule,
    ArticleRoutingModule,
    NzButtonModule,
    StoreModule.forFeature(
      fromArticle.articleFeatureKey,
      fromArticle.reducers,
      { metaReducers: fromArticle.metaReducers }
    ),
    EffectsModule.forFeature([PublishArticlePageEffects]),
    NzListModule,
    NzInputModule,
    NzDropDownModule,
    FormsModule,
    NzMessageModule,
    NzIconModule.forChild([PlusOutline]),
    QuillModule,
    NzModalModule,
  ],
})
export class ArticleModule {}
