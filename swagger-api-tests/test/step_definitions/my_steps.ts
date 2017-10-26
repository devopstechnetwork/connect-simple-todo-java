'use strict';

import {defineSupportCode} from "cucumber";
import {expect} from "chai";
import TodoApi, {Todo} from "../generated-api";
import * as assert from "assert";

defineSupportCode(function ({Given, When, Then}) {

    const todoApi = new TodoApi('http://localhost:3001');
    let key: any;
    let res: any;
    let newResponse: any;
    let delResponse: any;

    Given(/^I call to-do api$/, async () => {

        let todos = await todoApi.getTodos({}).then((result) => {
            if (result) {
                for (let i = 0; i < result.length; i++) {
                    key = result[i]["id"];
                    console.log("resolved status is :" + result[i]["resolved"])
                    res = result;

                }
            }

        })
    })

    Given(/^I delete all the existing tasks$/, async () => {
        if (key) {
            console.log("res length is : " + res.length)
            for (let i: number = 0; i < res.length; i++) {
                const delExisting = await todoApi.removeTodo({
                    'id': res[i]["id"],
                    '$queryParameters': {
                        'id': res[i]["id"]
                    }
                }).then((delRes) => {
                    delResponse = delRes;
                }).then(() => {
                    console.log(delResponse);
                });
            }
        }

    });


    When(/^I add a new task$/, async () => {

        let addTodo = await todoApi.addTodo({
            'body': {
                'id': '1',
                'title': 'string',
                'resolved': true
            }
        }).then((response) => {
            console.log(response);
            newResponse = response;
        })

    })

    Then(/^I should see response with id and (.*) as:$/, async (resolved) => {
        expect(newResponse).to.not.equal(null);
        let addedResponse = "'" + newResponse[0]["resolved"] + "'"
        console.log(addedResponse)
        expect(addedResponse).to.contain(resolved)
        console.log(newResponse[0]["id"]);
        expect(newResponse[0]["id"].length).to.not.equal(null);
    });

    When(/^I call resolve todo api$/, async () => {

        const resolveTodo = await todoApi.resolveTodo({
            'id': newResponse[0]["id"],
            '$queryParameters': {
                'id': newResponse[0]["id"]
            }
        }).then((response) => {
            console.log(response);
            newResponse = response
        })


    })

    Then(/^I should see the response as:$/, async () => {

        assert.deepEqual(delResponse, [])

    });
});