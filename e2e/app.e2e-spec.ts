import { EventSystemPage } from './app.po';

describe('event-system App', function() {
  let page: EventSystemPage;

  beforeEach(() => {
    page = new EventSystemPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('es works!');
  });
});
