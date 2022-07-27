declare class Args {
    initialArgs: string[];
    sep: string;
    componentName: string;
    componentDir: string;
    styleExtension: string;
    jsExtension: string;
    changeIfExists: boolean;
    constructor();
    private init;
    private processPath;
    private resolveArgs;
}
export default Args;
