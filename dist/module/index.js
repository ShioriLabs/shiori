"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __importDefault(require("./core"));
var fun_1 = __importDefault(require("./fun"));
var util_1 = __importDefault(require("./util"));
var acg_1 = __importDefault(require("./acg"));
var economy_1 = __importDefault(require("./economy"));
exports.default = [
    core_1.default,
    fun_1.default,
    util_1.default,
    acg_1.default,
    economy_1.default
];
