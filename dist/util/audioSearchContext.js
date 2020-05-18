"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getContext = exports.removeContext = exports.addContext = void 0;
var userContext = [];
function addContext(user, audioMessage, context) {
    var existingContext = userContext.find(function (item) { return item.user.id === user.id; });
    if (existingContext) {
        existingContext.context = context;
    }
    else {
        userContext.push({
            user: user,
            audioMessage: audioMessage,
            context: context
        });
    }
}
exports.addContext = addContext;
function removeContext(user) {
    userContext = userContext.filter(function (item) { return item.user.id !== user.id; });
}
exports.removeContext = removeContext;
function getContext(user) {
    return userContext.find(function (item) { return item.user.id === user.id; });
}
exports.getContext = getContext;
exports.default = userContext;
