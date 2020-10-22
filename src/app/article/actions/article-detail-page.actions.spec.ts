import * as fromArticleDetailPage from './article-detail-page.actions';

describe('loadArticleDetailPages', () => {
  it('should return an action', () => {
    expect(fromArticleDetailPage.loadArticleDetailPages().type).toBe('[ArticleDetailPage] Load ArticleDetailPages');
  });
});
