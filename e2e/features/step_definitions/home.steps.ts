import {binding, given, then} from 'cucumber-tsflow';
import {browser, by} from 'protractor';
import { assert } from 'chai';

@binding()
class MyStepDefinitions {
  @given(/^the home page$/)
  async getHomePage(): Promise<void> {
    await browser.get('/');
  }

  @then(/^home page is opened$/)
  async isHomePage(): Promise<void> {
    const pageTitle = await browser.element(by.tagName('h1')).getText();
    assert.equal(pageTitle, 'Home');
  }
}

export = MyStepDefinitions;
