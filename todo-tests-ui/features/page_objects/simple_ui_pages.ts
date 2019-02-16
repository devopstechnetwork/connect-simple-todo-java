'use strict';

let By = require('selenium-webdriver').By;
import {expect} from "chai";
import {Locator, until} from "selenium-webdriver";

let input: Locator = By.css('input');
let main: Locator = By.className("qa-main");
let done: Locator = By.className("qa-done-button");
let delTask: Locator = By.className("qa-delete-button");
let list: Locator = By.css('li.qa-main');

export class todoUiPageObjects {

    addTodoTask = async function (context, task) {
        await context.waitForElement(input);
        await context.driver.findElement(input).sendKeys(task);
        await context.driver.findElement(By.css('button[type="submit"]')).click();
        console.log("***** New task is added ***** ");

    };

    getRowText = async function (context, result: string) {
        await context.waitForElement(main);
        result = await context.driver.findElement(main).getText();
        return result;

    };

    deleteATask = async function (context) {
        await context.waitForElement(delTask);
        await context.driver.findElement(delTask).click();

    };

    waitInput = async function (context) {
        await context.driver.wait(until.elementLocated(input))

    };

    mainList = async function (context, elements: any) {
            elements = await context.driver.findElements(list);
            return Promise.resolve(elements);

    };


    clickDoneButton = async function (context) {
        await context.waitForElement(done);
        await context.driver.findElement(done).click();

    };

    deletedText = async function (context, text: string) {
        await context.waitForElement(list);
        text = await context.driver.findElement(list).getText();
        return text;

    };

}
module.exports = todoUiPageObjects;