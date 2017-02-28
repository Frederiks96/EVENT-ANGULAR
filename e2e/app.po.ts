import { browser, element, by } from 'protractor';

export class EventSystemPage {
  navigateTo() {
    return browser.get('/');
  }

  getParagraphText() {
    return element(by.css('es-root h1')).getText();
  }
}
