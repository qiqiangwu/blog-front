import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { BreadCrumbEffects } from './bread-crumb.effects';

describe('BreadCrumbEffects', () => {
  let actions$: Observable<any>;
  let effects: BreadCrumbEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        BreadCrumbEffects,
        provideMockActions(() => actions$)
      ]
    });

    effects = TestBed.inject(BreadCrumbEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
