"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AudioContext = exports.ServerContext = void 0;
var AudioContext = /** @class */ (function () {
    function AudioContext() {
    }
    AudioContext.prototype.setDispatcher = function (dispatcher) {
        this.dispatcher = dispatcher;
    };
    AudioContext.prototype.setSearchResult = function (user, sentMessage, results) {
        var existing = this.searchResult.find(function (item) { return item.user.id === user.id; });
        if (existing) {
            existing.sentMessage = sentMessage;
            existing.results = results;
        }
        else {
            this.searchResult.push({
                user: user,
                sentMessage: sentMessage,
                results: results
            });
        }
    };
    return AudioContext;
}());
exports.AudioContext = AudioContext;
var ServerContext = /** @class */ (function () {
    function ServerContext(server) {
        this.server = server;
        this.context.audio = new AudioContext();
    }
    return ServerContext;
}());
exports.ServerContext = ServerContext;
exports.default = ServerContext;
