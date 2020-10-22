import { Component, Input, OnInit } from '@angular/core';
import { User } from 'src/app/user/models/user';
import { UserService } from 'src/app/user/services/user/user.service';

@Component({
  selector: 'app-top-nav',
  templateUrl: './top-nav.component.html',
  styleUrls: ['./top-nav.component.less'],
})
export class TopNavComponent implements OnInit {
  @Input() user: User;

  size = 'large';
  constructor(private userService: UserService) {}

  ngOnInit(): void {}

  signOut() {
    this.userService.signOut();
  }
}
