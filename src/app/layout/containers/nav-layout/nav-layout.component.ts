import { Component, OnInit } from '@angular/core';
import { BreadCrumbService } from 'src/app/common/services/bread-crumb/bread-crumb.service';
import { UserService } from 'src/app/user/services/user/user.service';

@Component({
  selector: 'app-nav-layout',
  templateUrl: './nav-layout.component.html',
  styleUrls: ['./nav-layout.component.less'],
})
export class NavLayoutComponent implements OnInit {
  user$;
  breadCrumbItems$;

  constructor(
    public userService: UserService,
    private breadCrumbService: BreadCrumbService
  ) {
    this.user$ = this.userService.getUser();
    this.breadCrumbItems$ = this.breadCrumbService.getItems();
  }

  ngOnInit(): void {}
}
