"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
const Args_1 = require("./Args");
const utils_1 = require("./utils");
class Creator {
    constructor() {
        this.args = new Args_1.default();
        this.dirPath = `${this.args.componentDir}/${this.args.componentName}`;
        this.cssName = `${this.args.componentName}.module.${this.args.styleExtension}`;
        this.jsName = `${this.args.componentName}.${this.args.jsExtension}`;
        this.init();
    }
    async init() {
        this.createDirectory();
        await this.createJs();
        await this.createCss();
        console.log('Completed!');
    }
    createDirectory() {
        if (!fs.existsSync(this.dirPath)) {
            fs.mkdirSync(this.dirPath, { recursive: true });
        }
    }
    async createFile(filePath, data) {
        fs.writeFile(filePath, data, { flag: 'wx' }, async (err) => {
            if (err) {
                if (!(0, utils_1.stdinShouldComplete)(`${filePath} already exist. Should rewrite? [y/n]`)) {
                    return;
                }
                else {
                    fs.unlinkSync(filePath);
                    await this.createFile(filePath, data);
                }
            }
            else {
                console.log(`${filePath} created`);
            }
            return;
        });
    }
    async createJs() {
        const filePath = `${this.dirPath}/${this.jsName}`;
        const data = `import React from 'react';
    
  import style from '${this.cssName}';
      
  const ${this.args.componentName} = () => {
    return (
      <div>
          ${this.args.componentName}
      </div>
    );
  };
  
  export default ${this.args.componentName};
      `;
        await this.createFile(filePath, data);
    }
    async createCss() {
        await this.createFile(`${this.dirPath}/${this.cssName}`, '.container {\n\n}');
    }
}
exports.default = Creator;
