import { BananaPage } from './app.po';

describe('banana App', () => {
  let page: BananaPage;

  beforeEach(() => {
    page = new BananaPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
