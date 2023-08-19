"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var dayjs_1 = __importDefault(require("dayjs"));
// import dayjs from "dayjs";
var MyClass = /** @class */ (function () {
    function MyClass() {
    }
    MyClass.prototype.func = function (fn) {
        var bound = fn.bind(this);
        bound();
    };
    return MyClass;
}());
var instance = new MyClass();
var foo = dayjs_1.default;
var test = {
    dapi: dayjs_1.default
};
exports.default = test;
