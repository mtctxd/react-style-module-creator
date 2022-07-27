"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path = require("path");
class Args {
    constructor() {
        this.initialArgs = process.argv.slice(2);
        this.sep = path.sep;
        this.componentName = '';
        this.componentDir = '';
        this.styleExtension = 'css';
        this.jsExtension = 'js';
        this.changeIfExists = false;
        this.init();
    }
    init() {
        this.initialArgs.forEach((arg) => {
            if (arg.startsWith('-')) {
                this.resolveArgs(arg);
            }
            else {
                this.processPath(arg);
            }
        });
    }
    processPath(pathToProcess) {
        const { name, dir } = path.parse(pathToProcess);
        if (name) {
            this.componentName = name;
        }
        else {
            throw 'could not resolve path: "Name is not valid"';
        }
        if (dir) {
            this.componentDir = dir;
        }
        else {
            this.componentDir = './src/components';
        }
    }
    resolveArgs(arg) {
        switch (arg) {
            case '-y':
                this.changeIfExists = true;
                break;
            case '-scss':
                this.styleExtension = 'scss';
                break;
            case '-less':
                this.styleExtension = 'less';
                break;
            case '-css':
                this.styleExtension = 'css';
                break;
            case '-js' || '-jsx':
                this.jsExtension = 'jsx';
                break;
            case '-ts' || '-tsx':
                this.jsExtension = 'tsx';
                break;
            default:
                break;
        }
    }
}
exports.default = Args;
