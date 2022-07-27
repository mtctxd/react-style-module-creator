"use strict";
/*****************************
 *
 *        Ugly code
 *        Dont look!
 *
 ****************************/
Object.defineProperty(exports, "__esModule", { value: true });
const Creator_1 = require("./Creator");
new Creator_1.default();
process.on('exit', function (code) {
    return console.log(`Process to exit with code ${code}\nCompleted!!!`);
});
