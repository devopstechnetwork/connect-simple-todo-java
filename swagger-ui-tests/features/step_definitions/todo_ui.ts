'use strict';
import {defineSupportCode} from "cucumber";
import {expect} from "chai";

let todoUiPages = require('../page_objects/simple_ui_pages');
let todoUiPageObject = new todoUiPages();

defineSupportCode(function ({Given, When, Then}) {

    When(/^I launch the simple todo app$/, async function () {

        this.driver.get('http://todos.connect.cd');

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
        await this.driver.sleep(1000);
        let list: string = await todoUiPageObject.deletedText(self);
        expect(list).to.equal(deletedText);
    });

});
