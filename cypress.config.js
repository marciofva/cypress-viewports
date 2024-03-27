const { defineConfig } = require("cypress");

const fs = require('fs-extra');
const path = require('path');

module.exports = defineConfig({
  reporter: 'cypress-mochawesome-reporter',
  reporterOptions: {
    reportDir: "report",
    reportFilename: "[status]_[datetime]-report",
    charts: true,
    reportPageTitle: 'custom-title',
    embeddedScreenshots: true,
    inlineAssets: true,
    saveAllAttempts: false,
    saveJson: true,
    saveHtml: true,
    overwrite: true
  },
  screenshotsFolder: 'images',
  defaultCommandTimeout: 50000,
  requestTimeout: 80000,
  pageLoadTimeout: 80000,
  chromeWebSecurity: false,
  e2e: {
    setupNodeEvents(on, config) {
      require('cypress-mochawesome-reporter/plugin')(on);

      on('before:browser:launch', (browser, launchOptions) => {
        if (browser.name === 'chrome') {
          launchOptions.args.push('--disable-popup-blocking')
        }

        if (browser.family === 'firefox') {
          launchOptions.preferences['dom.disable_open_during_load'] = false
        }
        return launchOptions
      });

      const file = config.env.configFile || "develop";
      const pathToConfigFile = path.resolve('cypress/config', `${file}.json`);
      return fs.readJson(pathToConfigFile);
    },
  },
});
