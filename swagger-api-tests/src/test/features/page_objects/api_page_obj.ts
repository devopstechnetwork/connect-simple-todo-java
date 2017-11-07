 'use strict';
//
// import {defineSupportCode} from 'cucumber';
// import {expect} from "chai";
 import TodoApi from "../../generated-api";
// import {Given, When, Then} from 'cucumber';
//
// const file = require('../../properties/input.properties');
//
const todoApi = new TodoApi('http://localhost:3001/');
let key: any;
let todo: any;
// let newResponse: any;

import {expect} from "chai";
//
// let input: Locator = By.css('input');
// let main: Locator = By.className("qa-main");
// let del: Locator = By.xpath("//button[text()='Delete']");
// let done: Locator = By.className("qa-done-button");
// let delTask: Locator = By.className("qa-delete-button");
// let list: Locator = By.css('li');

export class todoApiGet {
    getApi = async function () {
        // await context.waitForElement(input);
        // await context.driver.findElement(input).sendKeys(task);
        // await context.driver.findElement(By.css('button[type="submit"]')).click();
        // console.log("***** New task is added ***** ");
        // return;
        todo = await todoApi.getTodos({});
        if (todo) {
            for (let i = 0; i < todo.length; i++) {
                key = todo[i]["id"];
                console.log("***** Resolved status is :" + todo[i]["resolved"] + ' *****')
            }

        }
    }
}
module.exports = todoApiGet;