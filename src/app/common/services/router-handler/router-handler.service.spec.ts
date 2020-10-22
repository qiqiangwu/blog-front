import { TestBed } from '@angular/core/testing';

import { RouterHandlerService } from './router-handler.service';

describe('RouterHandlerService', () => {
  let service: RouterHandlerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RouterHandlerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
