"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const assert_1 = __importDefault(require("assert"));
const main_1 = require("./main");
async function test() {
    const actual = await (0, main_1.main)();
    (0, assert_1.default)(actual != null);
    console.log("ok");
}
test();
//# sourceMappingURL=main.spec.js.map