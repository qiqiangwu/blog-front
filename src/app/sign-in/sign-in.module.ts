import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzMessageModule } from 'ng-zorro-antd/message';

import { SignInRoutingModule } from './sign-in-routing.module';
import { SignInPageComponent } from './containers/sign-in-page/sign-in-page.component';
import { SignInFormComponent } from './components/sign-in-form/sign-in-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import * as fromSignIn from './reducers';
import { EffectsModule } from '@ngrx/effects';
import { SignInEffects } from './effects/sign-in.effects';

@NgModule({
  declarations: [SignInPageComponent, SignInFormComponent],
  imports: [
    CommonModule,
    SignInRoutingModule,
    NzFormModule,
    NzButtonModule,
    NzMessageModule,
    ReactiveFormsModule,
    NzCheckboxModule,
    NzInputModule,
    StoreModule.forFeature(fromSignIn.signInFeatureKey, fromSignIn.reducers, {
      metaReducers: fromSignIn.metaReducers,
    }),
    EffectsModule.forFeature([SignInEffects]),
  ],
})
export class SignInModule {}
