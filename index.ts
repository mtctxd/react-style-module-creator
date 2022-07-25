import fs, { Stats } from 'fs';
import path from 'path';
import readline from 'readline';

class Args {
  public initialArgs: string[] = process.argv.slice(2);
  public sep = path.sep;
  public componentName = '';
  public componentDir = '';
  public styleExtension = 'css';
  public jsExtension = '.js';

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
  private readable = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  constructor() {
    this.createDirectory();
    this.createFiles();
  }

  private async createFiles() {
    // fs.appendFileSync;
    await this.createCss();
    const jsPath = `${this.dirPath}/${this.args.componentName}${this.args.jsExtension}`;
  }

  private async createCss() {
    const cssPath = `${this.dirPath}/${this.args.componentName}.module.${this.args.styleExtension}`;

    for (let extension of ['css', 'scss', 'less', 'sass']) {
      const fileNameToCheck = `${this.args.componentName}.module.${extension}`;

      const pethToCheck = `${this.dirPath}/${fileNameToCheck}`;
      if (fs.existsSync(pethToCheck)) {
        if (
          !(await this.shouldChangeFile(
            `style file ${fileNameToCheck} already exists, create new? [Y/n]`
          ))
        ) {
          console.log('skiped creation');
        }
      }
    }
  }

  private async shouldChangeFile(info: string) {
    const answer: string = await new Promise((resolve) => {
      this.readable.question(info, resolve);
    });

    return answer.toLowerCase() === 'y';
  }

  private createDirectory() {
    fs.mkdirSync(this.dirPath, {
      recursive: true,
    });
  }
}

const f = new FolderCreator();

// dont trust
// https://stackoverflow.com/questions/23044429/block-for-stdin-in-node-js

// todo

// path.isAbsolute(process.argv.slice(2)[0])
// should throw error if absolute
// more info about stdin (file name)
// if dont have argument programm should throw
