import {binding, given} from 'cucumber-tsflow';
import {browser} from 'protractor';

@binding()
class AppSteps {
  @given(/^the application$/)
  async getPage(): Promise<void> {
    await browser.waitForAngularEnabled(true);
    await browser.get('/');
  }
}

export = AppSteps;
