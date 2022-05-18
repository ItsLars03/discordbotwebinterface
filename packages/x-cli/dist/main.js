"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.main = void 0;
const x_core_1 = require("@discordbotwebinterface/x-core");
async function main() {
    // dependencies across child packages
    const out = await (0, x_core_1.awesomeFn)();
    return out;
}
exports.main = main;
//# sourceMappingURL=main.js.map