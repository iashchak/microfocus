import {binding, given, then} from 'cucumber-tsflow';
import {browser, by, ElementFinder, ExpectedConditions} from 'protractor';
import {assert} from 'chai';

@binding()
class LoginSteps {
  @given(/^the login page$/)
  async getPage(): Promise<void> {
    await browser.waitForAngularEnabled(true);
    await browser.get('/login');
  }


  @then(/^page contains username field$/)
  async userNameFieldPresent(): Promise<void> {
    const userField = await browser.element(by.id('userName'));
    const presence = await browser.isElementPresent(userField);
    assert.isTrue(presence);
  }

  @then(/^the (.*) username is entered$/)
  async enterUserName(userName: string): Promise<void> {
    const userField: ElementFinder = await browser.element(by.id('userName'));
    await userField.sendKeys(userName);
  }

  @then(/^Log In button should be (disabled|enabled)$/)
  async logInButtonIsDisabled(loginButtonState: 'enabled' | 'disabled'): Promise<void> {
    const button: ElementFinder = await browser.element(by.buttonText('Log In'));
    const isEnabled = await button.isEnabled();
    switch (loginButtonState) {
      case 'disabled':
        return assert.isFalse(isEnabled);
      case 'enabled':
        return assert.isTrue(isEnabled);
    }
  }

  @then(/^an error message should be displayed$/)
  async isErrorDisplayed(): Promise<void> {
    const messageBox: ElementFinder = await browser.element(by.className('invalid-feedback'));
    await browser.driver.wait(ExpectedConditions.visibilityOf(messageBox));
    const isElementPresent = await browser.isElementPresent(messageBox);
    assert.isTrue(isElementPresent);
  }

  @then(/^press the Log In button$/)
  async logIn(): Promise<void> {
    const button: ElementFinder = await browser.element(by.buttonText('Log In'));
    await button.click();
    await browser.waitForAngularEnabled(true);
  }
}

export = LoginSteps;
