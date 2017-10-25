'use strict';

import {defineSupportCode} from "cucumber";
import TodoApi, { Todo } from '../generated-api';


defineSupportCode(function ({Given, When, Then}) {

    const todoApi = new TodoApi('http://localhost:3001');


   Given(/^I call to-do api$/, async function () {
        const todos = await todoApi.getTodos({});

        //do something with todos
    });

});



