import * as path from 'path';

class Args {
  public initialArgs: string[] = process.argv.slice(2);
  public sep = path.sep;
  public componentName = '';
  public componentDir = '';
  public styleExtension = 'css';
  public jsExtension = 'js';
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
      this.componentDir = './src/components';
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

export default Args;
