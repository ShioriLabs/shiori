"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var ava_1 = __importDefault(require("ava"));
var module_1 = __importDefault(require("../../module"));
var compileHelpFile_1 = require("../../util/compileHelpFile");
ava_1.default('generates help page correctly', function (t) {
    var helpPage = compileHelpFile_1.compileHelpPage();
    t.is(helpPage.length, module_1.default.length, 'has correct module count');
    t.is(helpPage[0].module, module_1.default[0].name, 'has correct module name');
    t.is(helpPage[0].description, module_1.default[0].description, 'has correct module description');
    t.is(helpPage[0].id, "=help " + module_1.default[0].id, 'has correct module id');
});
ava_1.default('generates help file correctly', function (t) {
    var module = module_1.default[0];
    var helpFile = compileHelpFile_1.compileHelpFile(module.id);
    t.is(helpFile.name, module.name, 'has correct module name');
    t.is(helpFile.description, module.description, 'has correct module description');
    t.is(helpFile.help.length, module.commands.length, 'has correct command count');
});
ava_1.default('handled invalid module help file generation', function (t) {
    t.throws(function () { return compileHelpFile_1.compileHelpFile('nothing'); });
});
