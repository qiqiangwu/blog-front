import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NavLayoutComponent } from './layout/containers/nav-layout/nav-layout.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/home',
  },
  {
    path: 'sign-in',
    loadChildren: () =>
      import('./sign-in/sign-in.module').then((mod) => mod.SignInModule),
  },
  {
    path: 'article',
    loadChildren: () =>
      import('./article/article.module').then((mod) => mod.ArticleModule),
  },
  {
    path: '',
    component: NavLayoutComponent,
    children: [
      {
        path: 'home',
        loadChildren: () =>
          import('./home/home.module').then((mod) => mod.HomeModule),
      },
      {
        path: 'article/:id/:title',
        loadChildren: () =>
          import('./article/article.module').then((mod) => mod.ArticleModule),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
