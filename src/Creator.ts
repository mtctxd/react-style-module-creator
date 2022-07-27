import * as fs from 'fs';

import Args from './Args';
import { stdinShouldComplete } from './utils';

export default class Creator {
    private args = new Args();
    private dirPath: string = `${this.args.componentDir}/${this.args.componentName}`;
    private cssName: string = `${this.args.componentName}.module.${this.args.styleExtension}`;
    private jsName: string = `${this.args.componentName}.${this.args.jsExtension}`;
  
    constructor() {
      this.init();
    }
  
    private async init() {
      this.createDirectory();
      await this.createJs();
      await this.createCss();
      console.log('Completed!');
    }
  
    private createDirectory() {
      if (!fs.existsSync(this.dirPath)) {
        fs.mkdirSync(this.dirPath, { recursive: true });
      }
    }
  
    private async createFile(filePath: string, data: string) {
      fs.writeFile(filePath, data, { flag: 'wx' }, async (err) => {
        if (err) {
          if (
            !stdinShouldComplete(
              `${filePath} already exist. Should rewrite? [y/n]`
            )
          ) {
            return;
          } else {
            fs.unlinkSync(filePath);
            await this.createFile(filePath, data);
          }
        } else {
          console.log(`${filePath} created`);
        }
        return;
      });
    }
  
    private async createJs() {
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
  
    private async createCss() {
      await this.createFile(
        `${this.dirPath}/${this.cssName}`,
        '.container {\n\n}'
      );
    }
  }