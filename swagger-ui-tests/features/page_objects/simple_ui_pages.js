'use strict';
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
let By = require('selenium-webdriver').By;
const selenium_webdriver_1 = require("selenium-webdriver");
let input = By.css('input');
let main = By.className("qa-main");
let done = By.className("qa-done-button");
let delTask = By.className("qa-delete-button");
let list = By.css('li.qa-main');
class todoUiPageObjects {
    constructor() {
        this.addTodoTask = function (context, task) {
            return __awaiter(this, void 0, void 0, function* () {
                yield context.waitForElement(input);
                yield context.driver.findElement(input).sendKeys(task);
                yield context.driver.findElement(By.css('button[type="submit"]')).click();
                console.log("***** New task is added ***** ");
            });
        };
        this.getRowText = function (context, result) {
            return __awaiter(this, void 0, void 0, function* () {
                yield context.waitForElement(main);
                result = yield context.driver.findElement(main).getText();
                return result;
            });
        };
        this.deleteATask = function (context) {
            return __awaiter(this, void 0, void 0, function* () {
                yield context.waitForElement(delTask);
                yield context.driver.findElement(delTask).click();
            });
        };
        this.waitInput = function (context) {
            return __awaiter(this, void 0, void 0, function* () {
                yield context.driver.wait(selenium_webdriver_1.until.elementLocated(input));
            });
        };
        this.mainList = function (context, elements) {
            return __awaiter(this, void 0, void 0, function* () {
                elements = yield context.driver.findElements(list);
                return Promise.resolve(elements);
            });
        };
        this.clickDoneButton = function (context) {
            return __awaiter(this, void 0, void 0, function* () {
                yield context.waitForElement(done);
                yield context.driver.findElement(done).click();
            });
        };
        this.deletedText = function (context, text) {
            return __awaiter(this, void 0, void 0, function* () {
                yield context.waitForElement(list);
                text = yield context.driver.findElement(list).getText();
                return text;
            });
        };
    }
}
exports.todoUiPageObjects = todoUiPageObjects;
module.exports = todoUiPageObjects;
//# sourceMappingURL=simple_ui_pages.js.map