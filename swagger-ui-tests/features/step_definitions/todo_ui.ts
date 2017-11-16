'use strict';
import {defineSupportCode} from "cucumber";
import {expect} from "chai";

let todoUiPages = require('../simple_page_objects/todo_ui_pages');
let todoUiPageObject = new todoUiPages();

defineSupportCode(function ({Given, When, Then}) {

    When(/^I launch the simple todo app$/, async function () {

        this.driver.get('http://localhost:3000/');

    });

    Given(/^I add a new (.*)$/, async function (task) {

        await todoUiPageObject.addTodoTask(this, task);

    });

    Then(/^I should see a newly added (.*) in the simple todo app page$/, async function (task) {

        let self = this;

        let list: string = await todoUiPageObject.getRowText(self);
        expect(list).to.contain(task);

    });

    Given(/^I delete the above created task$/, async function () {

        await todoUiPageObject.deleteATask(this);

    });

    When(/^I click on done$/, async function () {

        await todoUiPageObject.clickDoneButton(this);
        console.log("***** Task is updated successfully ***** ");

    });

    Then(/^I should see the text as (.*)$/, async function (deletedText) {

        let self = this;

        let list: string = await todoUiPageObject.deletedText(self);
        expect(list).to.equal(deletedText);
    });

    Then(/^I delete the above done task$/, async function () {
        let self = this;

        await todoUiPageObject.deleteDoneTask(self);
        console.log("***** Task is deleted successfully ***** ");

    });
});