import { Component, OnInit } from '@angular/core';
import { BreadCrumbService } from './common/services/bread-crumb/bread-crumb.service';
import { RouterHandlerService } from './common/services/router-handler/router-handler.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less'],
})
export class AppComponent implements OnInit {
  constructor(
    private routerHandler: RouterHandlerService,
    private breadcrumbService: BreadCrumbService
  ) {}

  ngOnInit(): void {
    this.routerHandler.popToDeleteRouteSnapshot();

    this.breadcrumbService.init();
  }
}
