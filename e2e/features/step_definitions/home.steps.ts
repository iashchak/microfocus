import { binding, given, then } from 'cucumber-tsflow';
import { browser, by, ExpectedConditions } from 'protractor';
import { assert } from 'chai';
import AppSteps = require('./app.steps');

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

  @then(
    /^(\d) row and (\d) column contains the user name - (.*) and the company name - (.*)$/
  )
  async userColumnPresent(
    rowNumber: number,
    columnNumber: number,
    userName: string,
    companyName: string
  ): Promise<void> {
    const firstRow = await browser
      .element(by.xpath(`//tr[${rowNumber}]/td[${columnNumber}]`))
      .getText();
    const [actualName, actualCompanyName] = firstRow.split('\n');
    assert.equal(actualName, userName);
    assert.equal(actualCompanyName, companyName);
  }

  @then(
    /^(\d) row and (\d) column contains the title - (.*) and the content - (.*)$/
  )
  async postColumnPresent(
    rowNumber: number,
    columnNumber: number,
    title: string,
    content: string
  ): Promise<void> {
    const firstRow = await browser
      .element(by.xpath(`//tr[${rowNumber}]/td[${columnNumber}]`))
      .getText();
    const [actualTitle, actualContent] = firstRow.split('\n');
    assert.equal(actualTitle, title);
    assert.equal(actualContent, content);
  }

  @then(/^click on title of the post #(\d)$/)
  async clickToEditPost(postNumber: number): Promise<void> {
    await browser.element(by.xpath(`//tr[${postNumber}]/td[2]//a`)).click();
  }
}

export = MyStepDefinitions;
