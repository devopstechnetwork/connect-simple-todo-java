'use strict';

import {defineSupportCode} from 'cucumber';
import * as path from "path";
import {expect} from "chai";

import TodoApi from "../generated-api";

import {Given, When, Then} from 'cucumber';
import {isBoolean} from "util";

// defineSupportCode(function ({Given, When, Then}) {

    const todoApi = new TodoApi('http://localhost:3001');
    let key: any;
    let res: any;
    let newResponse: any;

    Given(/^I get a list of to-dos$/, async () => {

        let todos = await todoApi.getTodos({});
        console.log("I get the response now:" + todos);
        if (todos) {
            for (let i = 0; i < todos.length; i++) {
                key = todos[i]["id"];
                console.log("resolved status is :" + todos[i]["resolved"])
            }

        }
        res = todos;
    });

    Given(/^I delete all the existing to-do tasks$/, async () => {
        if (key) {
            console.log("res length is : " + res.length);
            for (let i: number = 0; i < res.length; i++) {
                let delResponse = await todoApi.removeTodo({
                    'id': res[i]["id"],
                    '$queryParameters': {
                        'id': res[i]["id"]
                    }
                });
                console.log("response after delete" + delResponse);
            }
        }

    });


    When(/^I add a new task with title (.*)$/, async (title: string) => {

        newResponse = await todoApi.addTodo({
            'body': {
                'id': '1',
                'title': title,
                'resolved': true
            }
        });

        console.log("I wanna see the response of this :" + newResponse);

    });

    Then(/^I should get a response with an id, title (.*) and a task resolved status as (.*)$/, (title: string, resolved: string) => {

        let expected = (resolved == 'true');

        console.log('Response value',newResponse[0]["resolved"] )
        expect(newResponse[0]["resolved"]).to.equal(expected);
        expect(parseInt(newResponse[0]["id"])).to.be.a('number');
        expect(newResponse[0]["title"]).to.equal(title);
    });

    When(/^I call resolve to-do api$/, async () => {

        const resolveTodo = await todoApi.resolveTodo({
            'id': newResponse[0]["id"],
            '$queryParameters': {
                'id': newResponse[0]["id"]
            }
        })
        // .then((response) => {
        // console.log(response);
        // newResponse = response

        newResponse = resolveTodo;
        console.log("new response after resolving is :" + newResponse);

    });

    Then(/^I should see null response$/, () => {

        expect(res).to.eql([]);

    });
// });

