import * as fromHomePage from './home-page.actions';

describe('loadHomePages', () => {
  it('should return an action', () => {
    expect(fromHomePage.loadHomePages().type).toBe('[HomePage] Load HomePages');
  });
});
