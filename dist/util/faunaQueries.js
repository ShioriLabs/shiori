"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendMoney = exports.deductBalance = exports.getAccountInfo = exports.createAccount = void 0;
var faunadb_1 = __importDefault(require("faunadb"));
var dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
var q = faunadb_1.default.query;
var client = new faunadb_1.default.Client({
    secret: process.env.FAUNA_TOKEN || ''
});
var createAccount = function (user) { return __awaiter(void 0, void 0, void 0, function () {
    var account;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, client.query(q.Create(q.Collection('balance'), {
                    data: {
                        user: user.id,
                        balance: 100
                    }
                }))];
            case 1:
                account = _a.sent();
                return [2 /*return*/, account];
        }
    });
}); };
exports.createAccount = createAccount;
var getAccountInfo = function (user) { return __awaiter(void 0, void 0, void 0, function () {
    var account, _a, account;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 2, , 4]);
                return [4 /*yield*/, client.query(q.Get(q.Match(q.Index('selectByUser'), user.id)))];
            case 1:
                account = _b.sent();
                return [2 /*return*/, account];
            case 2:
                _a = _b.sent();
                return [4 /*yield*/, createAccount(user)];
            case 3:
                account = _b.sent();
                return [2 /*return*/, account];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.getAccountInfo = getAccountInfo;
var deductBalance = function (user, amount) { return __awaiter(void 0, void 0, void 0, function () {
    var account;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, getAccountInfo(user)];
            case 1:
                account = _a.sent();
                return [4 /*yield*/, client.query(q.Update(q.Select('ref', q.Get(q.Match(q.Index('selectByUser'), account.data.user))), {
                        data: {
                            balance: account.data.balance - amount
                        }
                    }))];
            case 2: return [2 /*return*/, _a.sent()];
        }
    });
}); };
exports.deductBalance = deductBalance;
var addBalance = function (user, amount) { return __awaiter(void 0, void 0, void 0, function () {
    var account;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, getAccountInfo(user)];
            case 1:
                account = _a.sent();
                return [4 /*yield*/, client.query(q.Update(q.Select('ref', q.Get(q.Match(q.Index('selectByUser'), account.data.user))), {
                        data: {
                            balance: account.data.balance + amount
                        }
                    }))];
            case 2: return [2 /*return*/, _a.sent()];
        }
    });
}); };
var sendMoney = function (user, receiver, amount) { return __awaiter(void 0, void 0, void 0, function () {
    var sender, from, to;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, getAccountInfo(user)];
            case 1:
                sender = _a.sent();
                if (sender.data.balance < amount) {
                    throw new Error('Not enough balance');
                }
                return [4 /*yield*/, addBalance(receiver, amount)];
            case 2:
                from = _a.sent();
                return [4 /*yield*/, deductBalance(user, amount)];
            case 3:
                to = _a.sent();
                return [2 /*return*/, [from, to]];
        }
    });
}); };
exports.sendMoney = sendMoney;
exports.default = client;
