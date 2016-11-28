import { BumpDatabasePage } from './app.po';

describe('bump-database App', function() {
  let page: BumpDatabasePage;

  beforeEach(() => {
    page = new BumpDatabasePage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
