import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavLayoutComponent } from './containers/nav-layout/nav-layout.component';
import { RouterModule } from '@angular/router';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { TopNavComponent } from './components/top-nav/top-nav.component';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { SettingOutline, LogoutOutline } from '@ant-design/icons-angular/icons';
import { BreadCrumbComponent } from './components/bread-crumb/bread-crumb.component';

@NgModule({
  declarations: [NavLayoutComponent, TopNavComponent, BreadCrumbComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([]),
    NzLayoutModule,
    NzBreadCrumbModule,
    NzMenuModule,
    NzButtonModule,
    NzDropDownModule,
    NzIconModule.forChild([SettingOutline, LogoutOutline]),
  ],
  exports: [NavLayoutComponent],
})
export class LayoutModule {}
