'use strict';
import {defineSupportCode} from "cucumber";
import {expect} from "chai";

let todoUiPages = require('../page_objects/todo_ui_pages');
let todoUiPageObject = new todoUiPages();

const tsconfig = require("../../../swagger-ui-tests/tsconfig.json");

defineSupportCode(function ({Given, When, Then}) {

    When(/^I launch the simple todo app$/, async function () {

        this.driver.get(tsconfig.compilerOptions.baseUrl);

    });

    Given(/^I add a new (.*)$/, async function (task) {

        await todoUiPageObject.addTodoTask(this, task);

    });

    Then(/^I should see a newly added (.*) in the simple todo app page$/, async function (task) {

        let self = this;

        let list: string = await todoUiPageObject.getRowText(self);
        expect(list).to.contain(task);
        console.log('My list contains ' + list);

    });

    Given(/^I delete the above created task$/, async function () {

        await todoUiPageObject.deleteATask(this);
        console.log('deleted the created task');

    });

    When(/^I click on done$/, async function () {

        await todoUiPageObject.clickDoneButton(this);
        console.log('done');

    });

    Then(/^I should see the text as (.*)$/, async function (deletedText) {

        let self = this;

        let list: string = await todoUiPageObject.deletedText(self);
        console.log("my li list contains :" + list);
        expect(list).to.equal(deletedText);
    });

    Then(/^I delete the above done task$/, async function () {
        let self = this;

        await todoUiPageObject.deleteDoneTask(self);
        console.log('done task is deleted');
    });


    Given(/I delete the existing tasks$/, async function () {
        let self = this;

        await todoUiPageObject.waitInput(self);
        let elements = await todoUiPageObject.mainList(self);
        for (let element of elements) {
            await todoUiPageObject.deleteDoneTask(self);
        }

    });
});