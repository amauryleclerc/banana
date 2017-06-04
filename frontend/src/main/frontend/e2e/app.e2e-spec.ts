import { BananaPage } from './app.po';

describe('banana App', () => {
  let page: BananaPage;

  beforeEach(() => {
    page = new BananaPage();
  });

  it('should display welcome message', done => {
    page.navigateTo();
    page.getParagraphText()
      .then(msg => expect(msg).toEqual('Welcome to app!!'))
      .then(done, done.fail);
  });
});
