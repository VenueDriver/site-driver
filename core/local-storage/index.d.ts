declare const path: any;
declare const fs: any;
declare const QueryFilter: any;
declare const mkdirp: any;
declare const asyncLoop: any;
declare const stringToJSON: (str: any) => any;
declare class LocalStorage {
    constructor(opts: any);
    getInstanceNames(): Promise<{}>;
    queryRoutes(): Promise<{}>;
    get(): Promise<{}>;
    write(data: any, location: any, filename: any): Promise<{}>;
    post(): Promise<{}>;
    readFile(location: any, file: any): Promise<{}>;
    readdir(location: any, opts: any): Promise<{}>;
    unlink(location: any, filename: any): Promise<{}>;
    remove(): Promise<{}>;
}
