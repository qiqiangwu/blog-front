import * as fromBreadCrumb from './bread-crumb.actions';

describe('loadBreadCrumbs', () => {
  it('should return an action', () => {
    expect(fromBreadCrumb.loadBreadCrumbs().type).toBe('[BreadCrumb] Load BreadCrumbs');
  });
});
