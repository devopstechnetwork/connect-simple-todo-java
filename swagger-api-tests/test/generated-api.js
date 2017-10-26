"use strict";
/* tslint:disable:no-string-literal */
/* tslint:disable:member-ordering */
/* tslint:disable:quotemark */
/* tslint:disable:typedef-whitespace */
exports.__esModule = true;
var axios_1 = require("axios");
var TodoApi = (function () {
    function TodoApi(domain, logger) {
        this.logger = logger;
        this.domain = '';
        this.globalHeaders = {};
        if (domain) {
            this.domain = domain;
        }
        this.resolveTodo = this.resolveTodo.bind(this);
        this.removeTodo = this.removeTodo.bind(this);
        this.addTodo = this.addTodo.bind(this);
        this.getTodos = this.getTodos.bind(this);
    }
    TodoApi.prototype.request = function (method, url, body, headers, queryParameters, form, reject, resolve) {
        var _this = this;
        if (this.logger) {
            this.logger.log("Call " + method + " " + url);
        }
        Object.keys(this.globalHeaders).forEach(function (key) {
            headers[key] = _this.globalHeaders[key];
        });
        return axios_1["default"]({
            method: method,
            url: url,
            params: queryParameters,
            data: body,
            headers: headers
        }).then(function (response) {
            resolve(response.data);
        })["catch"](function (error) {
            reject(error);
        });
    };
    TodoApi.prototype.resolveTodo = function (parameters) {
        var _this = this;
        var domain = parameters.$domain ? parameters.$domain : this.domain;
        var path = '/resolve-todo/{id}';
        var body;
        var queryParameters = {};
        var headers = {};
        var form = {};
        return new Promise(function (resolve, reject) {
            path = path.replace('{id}', "" + parameters['id']);
            if (parameters['id'] === undefined) {
                reject(new Error('Missing required  parameter: id'));
                return;
            }
            if (parameters.$queryParameters) {
                Object.keys(parameters.$queryParameters).forEach(function (parameterName) {
                    queryParameters[parameterName] = parameters.$queryParameters[parameterName];
                });
            }
            _this.request('PUT', domain + path, body, headers, queryParameters, form, reject, resolve);
        });
    };
    TodoApi.prototype.removeTodo = function (parameters) {
        var _this = this;
        var domain = parameters.$domain ? parameters.$domain : this.domain;
        var path = '/remove-todo/{id}';
        var body;
        var queryParameters = {};
        var headers = {};
        var form = {};
        return new Promise(function (resolve, reject) {
            path = path.replace('{id}', "" + parameters['id']);
            if (parameters['id'] === undefined) {
                reject(new Error('Missing required  parameter: id'));
                return;
            }
            if (parameters.$queryParameters) {
                Object.keys(parameters.$queryParameters).forEach(function (parameterName) {
                    queryParameters[parameterName] = parameters.$queryParameters[parameterName];
                });
            }
            _this.request('DELETE', domain + path, body, headers, queryParameters, form, reject, resolve);
        });
    };
    TodoApi.prototype.addTodo = function (parameters) {
        var _this = this;
        var domain = parameters.$domain ? parameters.$domain : this.domain;
        var path = '/add-todo';
        var body;
        var queryParameters = {};
        var headers = {};
        var form = {};
        return new Promise(function (resolve, reject) {
            if (parameters['body'] !== undefined) {
                body = parameters['body'];
            }
            if (parameters.$queryParameters) {
                Object.keys(parameters.$queryParameters).forEach(function (parameterName) {
                    queryParameters[parameterName] = parameters.$queryParameters[parameterName];
                });
            }
            form = queryParameters;
            queryParameters = {};
            _this.request('POST', domain + path, body, headers, queryParameters, form, reject, resolve);
        });
    };
    TodoApi.prototype.getTodos = function (parameters) {
        var _this = this;
        var domain = parameters.$domain ? parameters.$domain : this.domain;
        var path = '/get-todos';
        var body;
        var queryParameters = {};
        var headers = {};
        var form = {};
        return new Promise(function (resolve, reject) {
            if (parameters.$queryParameters) {
                Object.keys(parameters.$queryParameters).forEach(function (parameterName) {
                    queryParameters[parameterName] = parameters.$queryParameters[parameterName];
                });
            }
            _this.request('GET', domain + path, body, headers, queryParameters, form, reject, resolve);
        });
    };
    return TodoApi;
}());
exports["default"] = TodoApi;
//# sourceMappingURL=generated-api.js.map