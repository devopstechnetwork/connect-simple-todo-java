'use strict';

import {defineSupportCode} from "cucumber";
import {Builder, Locator} from "selenium-webdriver";

const fs = require('fs');
let until = require('selenium-webdriver').until;

const buildChromeDriver = function () {
    return new Builder().forBrowser("chrome").build();
};

defineSupportCode(function ({setDefaultTimeout}) {
    setDefaultTimeout(60 * 1000);
});

defineSupportCode(function ({setWorldConstructor}) {
    setWorldConstructor(World);
});

const World = function World() {
    let defaultTimeout = 10000;

    this.waitForElement = async function (locator: Locator, elements: any, timeout) {
        timeout = timeout || defaultTimeout;
        elements = await this.driver.wait(until.elementsLocated(locator),timeout);
        return Promise.resolve(elements);
    };

    const screenshotsPath = "screenshots";

    this.driver = buildChromeDriver();

    if (!fs.existsSync(screenshotsPath)) {
        fs.mkdirSync(screenshotsPath);
    }
};
