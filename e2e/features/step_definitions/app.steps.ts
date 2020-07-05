import { binding, given } from 'cucumber-tsflow';
import { browser, by, ElementFinder, ExpectedConditions } from 'protractor';
import { then } from 'cucumber-tsflow/dist';
import { assert } from 'chai';

@binding()
class AppSteps {
  static async wait(): Promise<void> {
    await browser.sleep(500);
    const spinner = browser.element(by.className('loader--present'));
    await browser.wait(ExpectedConditions.stalenessOf(spinner));
  }

  @given(/^the application$/)
  async getPage(): Promise<void> {
    await browser.waitForAngularEnabled(true);
    await browser.get('/');
  }

  @then(/^page contains #(.*) field$/)
  @then(/^page contains #(.*) button$/)
  async descriptionFieldPresent(elementId: string): Promise<void> {
    const element = await browser.element(by.id(elementId));
    const presence = await browser.isElementPresent(element);
    assert.isTrue(presence);
  }

  @then(/^press the #(.*) button$/)
  async pressTheButton(id: string): Promise<void> {
    const button: ElementFinder = await browser.element(by.id(id));
    await button.click();
  }

  @then(/^fill the field #(.*) with value (.*)$/, null, browser.getPageTimeout)
  async fillFieldWithValue(fieldId: string, textValue: string): Promise<void> {
    const userField: ElementFinder = await browser.element(by.id(fieldId));
    await userField.clear();
    await userField.sendKeys(textValue);
  }

  @then(
    /^fill the field #(.*) with (\d+) characters$/,
    null,
    browser.getPageTimeout
  )
  async fillByLength(
    fieldId: string,
    numberOfCharacters: number
  ): Promise<void> {
    const stringWithRandomCharacters = '#'.repeat(numberOfCharacters);
    await this.fillFieldWithValue(fieldId, stringWithRandomCharacters);
  }

  @then(/^a message #(.*) should be displayed$/)
  async isErrorDisplayed(fieldId: string): Promise<void> {
    const messageBox: ElementFinder = await browser.element(by.id(fieldId));
    await browser.driver.wait(ExpectedConditions.presenceOf(messageBox));
    const isElementPresent = await messageBox.isDisplayed();
    assert.isTrue(isElementPresent);
  }

  @then(/^button #(.*) should be (disabled|enabled)$/)
  async isElementEnabled(
    elementId: string,
    loginButtonState: 'enabled' | 'disabled'
  ): Promise<void> {
    await browser.driver.sleep(1000);
    const button: ElementFinder = await browser.element(by.id(elementId));
    const isEnabled = await button.isEnabled();
    switch (loginButtonState) {
      case 'disabled':
        return assert.isFalse(isEnabled);
      case 'enabled':
        return assert.isTrue(isEnabled);
    }
  }

  @then(/^answer "(apply|cancel)" for alert$/)
  async answerForConfirmationDialog(answer: 'apply' | 'cancel'): Promise<void> {
    await browser.waitForAngularEnabled(false);
    await browser.wait(ExpectedConditions.alertIsPresent());
    switch (answer) {
      case 'apply':
        await browser.switchTo().alert().accept();
        break;
      case 'cancel':
        await browser.switchTo().alert().dismiss();
        break;
    }
    await browser.waitForAngularEnabled(true);
  }
}

export = AppSteps;
