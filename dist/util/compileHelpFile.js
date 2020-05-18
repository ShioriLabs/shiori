"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.compileHelpFile = exports.compileHelpPage = void 0;
var module_1 = __importDefault(require("../module"));
function compileHelpFile(module) {
    var mod = module_1.default.filter(function (item) { return item.id === module; });
    if (mod.length === 0) {
        throw new Error();
    }
    return {
        name: mod[0].name,
        description: mod[0].description,
        help: mod[0].commands.map(function (item) {
            return {
                command: "=" + item.command,
                usage: item.usage
            };
        })
    };
}
exports.compileHelpFile = compileHelpFile;
function compileHelpPage() {
    return module_1.default.map(function (item) {
        return {
            module: item.name,
            description: item.description,
            id: "=help " + item.id
        };
    });
}
exports.compileHelpPage = compileHelpPage;
exports.default = { compileHelpPage: compileHelpPage, compileHelpFile: compileHelpFile };
