import { EventManagerPage } from './app.po';

describe('event-manager App', () => {
  let page: EventManagerPage;

  beforeEach(() => {
    page = new EventManagerPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
