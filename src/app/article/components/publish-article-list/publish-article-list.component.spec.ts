import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PublishArticleListComponent } from './publish-article-list.component';

describe('PublishArticleListComponent', () => {
  let component: PublishArticleListComponent;
  let fixture: ComponentFixture<PublishArticleListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PublishArticleListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PublishArticleListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
