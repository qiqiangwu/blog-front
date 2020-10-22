import * as fromArticleListStore from './article-list-store.actions';

describe('loadArticleListStores', () => {
  it('should return an action', () => {
    expect(fromArticleListStore.loadArticleListStores().type).toBe('[ArticleListStore] Load ArticleListStores');
  });
});
