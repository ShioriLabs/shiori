"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var Resolver_1 = __importDefault(require("./Resolver"));
var SimpleCommand = /** @class */ (function (_super) {
    __extends(SimpleCommand, _super);
    function SimpleCommand(command, callback, usage) {
        var _this = this;
        var _callback = function (_message, _args) {
            var returnValue = callback(_message, _args);
            _message.channel.send(returnValue);
        };
        _this = _super.call(this, command, _callback, usage) || this;
        return _this;
    }
    return SimpleCommand;
}(Resolver_1.default));
exports.default = SimpleCommand;
