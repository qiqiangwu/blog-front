import * as fromPublishArticlePage from './publish-article-page.actions';

describe('loadPublishArticlePages', () => {
  it('should return an action', () => {
    expect(fromPublishArticlePage.loadPublishArticlePages().type).toBe('[PublishArticlePage] Load PublishArticlePages');
  });
});
