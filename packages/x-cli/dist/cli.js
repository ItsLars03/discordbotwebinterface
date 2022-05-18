"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const main_1 = require("./main");
(0, main_1.main)()
    .then(out => {
    console.log(out);
    process.exit(0);
})
    .catch(err => {
    console.error(err);
    process.exit(1);
});
//# sourceMappingURL=cli.js.map