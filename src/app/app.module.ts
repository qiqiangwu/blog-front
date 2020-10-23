import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { zh_CN } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import zh from '@angular/common/locales/zh';
import { LayoutModule } from './layout/layout.module';
import { IconDefinition } from '@ant-design/icons-angular';
import { NzIconModule } from 'ng-zorro-antd/icon';

// 引入你需要的图标，比如你需要 fill 主题的 AccountBook Alert 和 outline 主题的 Alert，推荐 ✔️
import {
  AccountBookFill,
  AlertFill,
  AlertOutline,
} from '@ant-design/icons-angular/icons';
import { StoreModule } from '@ngrx/store';
import { reducers, metaReducers } from './common/reducers';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { EffectsModule } from '@ngrx/effects';
import { NgLoggerModule, Level } from '@nsalaun/ng-logger';
import { UserModule } from './user/user.module';
import { RouterEffects } from './common/effects/router.effects';
import { AddAuthorizationHeaderInterceptor } from './common/interceptors/add-authorization-header.interceptor';
import { QuillModule } from 'ngx-quill';
import { RouteReuseStrategy } from '@angular/router';
import { AppReuseStrategy } from './app-reuse-strategy';
import { NzMessageModule } from 'ng-zorro-antd/message';
import { AddCredentialsInterceptor } from './common/interceptors/add-credentials.interceptor';
import { BreadCrumbEffects } from './common/effects/bread-crumb.effects';
import { UnauthorizedInterceptor } from './common/interceptors/unauthorized.interceptor';

const icons: IconDefinition[] = [];

registerLocaleData(zh);

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NgLoggerModule.forRoot(Level.LOG),
    LayoutModule,
    NzIconModule.forRoot(icons),
    NzMessageModule,
    StoreModule.forRoot(reducers, { metaReducers }),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
    EffectsModule.forRoot([RouterEffects, BreadCrumbEffects]),
    UserModule,
    QuillModule.forRoot(),
  ],
  providers: [
    { provide: NZ_I18N, useValue: zh_CN },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AddAuthorizationHeaderInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AddCredentialsInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: UnauthorizedInterceptor,
      multi: true,
    },
    {
      provide: RouteReuseStrategy,
      useClass: AppReuseStrategy,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
