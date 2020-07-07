// @ts-check
// Protractor configuration file, see link for more information
// https://github.com/angular/protractor/blob/master/lib/config.ts

/**
 * @type { import("protractor").Config }
 */
exports.config = {
  allScriptsTimeout: 11000,
  getPageTimeout: 11000,
  specs:['features/**/*.feature'],
  restartBrowserBetweenTests: true,
  capabilities: {
    browserName: 'chrome'
  },
  chromeOptions: {
    args: [ "--headless" ]
  },
  directConnect: true,
  baseUrl: 'http://localhost:4200/',
  framework: 'custom',
  frameworkPath: require.resolve('protractor-cucumber-framework'),
  cucumberOpts: {
    compiler: "ts:ts-node/register",
    format: 'json:.tmp/results.json',
    strict: true,
    require:[
      'features/step_definitions/**/*.steps.ts'
    ]
  },
  onPrepare() {
    require('ts-node').register({
      project: require('path').join(__dirname, './tsconfig.json')
    });
  },
  plugins: [{
    package: 'protractor-multiple-cucumber-html-reporter-plugin',
    options:{
      // read the options part for more options
      automaticallyGenerateReport: true,
      removeExistingJsonReportFile: true,
      pageTitle: 'MicroFocus UI exercise',
      reportName: 'MicroFocus UI exercise',
      pageFooter: ' '
    }
  }]
};
