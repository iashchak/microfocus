import { binding, given } from 'cucumber-tsflow';
import { browser } from 'protractor';
import AppSteps = require('./app.steps');

@binding()
class LoginSteps {
  @given(/^the login page$/)
  async getPage(): Promise<void> {
    await browser.waitForAngularEnabled(true);
    await browser.get('/login');
  }
}

export = LoginSteps;
