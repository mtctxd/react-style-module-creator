/*****************************
 * 
 *        Ugly code
 *        Dont look!
 * 
 ****************************/
import fs from 'fs';
import path from 'path';
import readlineSync from 'readline-sync';

process.on('exit', function (code) {
  return console.log(`Process to exit with code ${code}\nCompleted!!!`);
});

class Args {
  public initialArgs: string[] = process.argv.slice(2);
  public sep = path.sep;
  public componentName = '';
  public componentDir = '';
  public styleExtension = 'css';
  public jsExtension = '.js';
  public changeIfExists = false;

  constructor() {
    this.init();
  }

  private init() {
    this.initialArgs.forEach((arg) => {
      if (arg.startsWith('-')) {
        this.resolveArgs(arg);
      } else {
        this.processPath(arg);
      }
    });
  }

  private processPath(pathToProcess: string) {
    const { name, dir } = path.parse(pathToProcess);

    if (name) {
      this.componentName = name;
    } else {
      throw 'could not resolve path: "Name is not valid"';
    }

    if (dir) {
      this.componentDir = dir;
    } else {
      this.componentDir = './src/componets';
    }
  }

  private resolveArgs(arg: string) {
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

class FolderCreator {
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

const stdinShouldComplete = (text: string) => {
  let result: string = readlineSync.question(`${text}\n`);

  return result.toLowerCase() === 'y';
};

const f = new FolderCreator();


// todo

// path.isAbsolute(process.argv.slice(2)[0])
// should throw error if absolute
// more info about stdin (file name)
// if dont have argument programm should throw
