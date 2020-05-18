declare function compileHelpFile(module: string): {
    name: string;
    description: string;
    help: {
        command: string;
        usage: string;
    }[];
};
declare function compileHelpPage(): Array<{
    module: string;
    description: string;
    id: string;
}>;
declare const _default: {
    compileHelpPage: typeof compileHelpPage;
    compileHelpFile: typeof compileHelpFile;
};
export default _default;
export { compileHelpPage, compileHelpFile };
