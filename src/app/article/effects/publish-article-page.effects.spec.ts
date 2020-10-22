import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { PublishArticlePageEffects } from './publish-article-page.effects';

describe('PublishArticlePageEffects', () => {
  let actions$: Observable<any>;
  let effects: PublishArticlePageEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        PublishArticlePageEffects,
        provideMockActions(() => actions$)
      ]
    });

    effects = TestBed.inject(PublishArticlePageEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
