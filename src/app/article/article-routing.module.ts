import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NavLayoutComponent } from '../layout/containers/nav-layout/nav-layout.component';
import { UserGuard } from '../user/guards/user.guard';
import { ArticleDetailPageComponent } from './containers/article-detail-page/article-detail-page.component';
import { PublishArticlePageComponent } from './containers/publish-article-page/publish-article-page.component';

const routes: Routes = [
  {
    path: 'publish',
    component: PublishArticlePageComponent,
    canActivate: [UserGuard],
    data: {
      reuse: true,
    },
  },
  {
    path: '',
    component: ArticleDetailPageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ArticleRoutingModule {}
