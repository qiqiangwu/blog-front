import * as fromSignInPage from './sign-in-page.actions';

describe('loadSignInPages', () => {
  it('should return an action', () => {
    expect(fromSignInPage.loadSignInPages().type).toBe('[SignInPage] Load SignInPages');
  });
});
