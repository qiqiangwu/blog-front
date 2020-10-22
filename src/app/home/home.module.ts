import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomePageComponent } from './containers/home-page/home-page.component';
import { StoreModule } from '@ngrx/store';
import * as fromHome from './reducers';
import { EffectsModule } from '@ngrx/effects';
import { HomeEffects } from './effects/home.effects';
import { HomeArticlesComponent } from './components/home-articles/home-articles.component';
import { NzListModule } from 'ng-zorro-antd/list';
import { NzButtonModule } from 'ng-zorro-antd/button';
@NgModule({
  declarations: [HomePageComponent, HomeArticlesComponent],
  imports: [
    CommonModule,
    HomeRoutingModule,
    StoreModule.forFeature(fromHome.homeFeatureKey, fromHome.reducers, {
      metaReducers: fromHome.metaReducers,
    }),
    EffectsModule.forFeature([HomeEffects]),
    NzListModule,
    NzButtonModule
  ],
})
export class HomeModule {}
