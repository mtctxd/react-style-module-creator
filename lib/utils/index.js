"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.stdinShouldComplete = void 0;
const readlineSync = require("readline-sync");
const stdinShouldComplete = (text) => {
    let result = readlineSync.question(`${text}\n`);
    return result.toLowerCase() === 'y';
};
exports.stdinShouldComplete = stdinShouldComplete;
