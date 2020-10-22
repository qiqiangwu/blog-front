import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PublishArticlePageComponent } from './publish-article-page.component';

describe('PublishArticlePageComponent', () => {
  let component: PublishArticlePageComponent;
  let fixture: ComponentFixture<PublishArticlePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PublishArticlePageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PublishArticlePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
