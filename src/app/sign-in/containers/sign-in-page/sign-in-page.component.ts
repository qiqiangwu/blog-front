import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import * as fromSignIn from '../../reducers';
import { SignInPageActions } from '../../actions';
import { filter, take, withLatestFrom } from 'rxjs/operators';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NavigateService } from 'src/app/common/services/navigate/navigate.service';

@Component({
  selector: 'app-sign-in-page',
  templateUrl: './sign-in-page.component.html',
  styleUrls: ['./sign-in-page.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SignInPageComponent implements OnInit {
  loading$ = this.store.pipe(select(fromSignIn.selectSignInLoading));
  success$ = this.store.pipe(select(fromSignIn.selectSignInSuccess));
  error$ = this.store.pipe(select(fromSignIn.selectSignInError));
  backUrl$ = this.store.pipe(select(fromSignIn.selectBackUrl));

  constructor(
    private store: Store<fromSignIn.State>,
    private message: NzMessageService,
    private navigate: NavigateService
  ) {}

  ngOnInit(): void {}

  onSignIn(event) {
    this.store.dispatch(
      SignInPageActions.signInRequest({
        account: event.account,
        password: event.password,
      })
    );

    this.error$
      .pipe(
        filter((val) => val != null),
        take(1)
      )
      .subscribe((error) => {
        this.message.create('error', error);
      });

    this.success$
      .pipe(
        filter((val) => val != null),
        take(1),
        withLatestFrom(this.backUrl$)
      )
      .subscribe(([success, backUrl]) => {
        if (success) {
          if (backUrl) {
            this.navigate.redirect(backUrl, true);

            this.store.dispatch(SignInPageActions.setBackUrl(null));
          } else {
            this.navigate.back();
          }
        }
      });
  }
}
