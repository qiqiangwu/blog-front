import { TestBed } from '@angular/core/testing';

import { ArticleListStoreService } from './article-list-store.service';

describe('ArticleListStoreService', () => {
  let service: ArticleListStoreService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ArticleListStoreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
