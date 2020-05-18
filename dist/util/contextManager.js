"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeContext = exports.getContext = exports.addContext = void 0;
var Contexts_1 = require("../class/Contexts");
var Context;
var addContext = function (server) {
    var checkExistingContext = Context.find(function (item) { return item.server.id === server.id; });
    if (!checkExistingContext) {
        var newContext = new Contexts_1.ServerContext(server);
        Context.push(newContext);
    }
};
exports.addContext = addContext;
var getContext = function (server) {
    var result = Context.find(function (item) { return item.server.id === server.id; });
    if (!result) {
        addContext(server);
        result = Context.find(function (item) { return item.server.id === server.id; });
    }
    return result;
};
exports.getContext = getContext;
var removeContext = function (server) {
    var filteredContext = Context.filter(function (ctx) { return ctx.server.id !== server.id; });
    Context = filteredContext;
};
exports.removeContext = removeContext;
var exportSetup = {
    addContext: addContext,
    getContext: getContext,
    removeContext: removeContext
};
exports.default = exportSetup;
