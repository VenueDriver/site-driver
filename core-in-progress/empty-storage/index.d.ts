declare class EmptyStorage {
    constructor(opts: any);
    get(): Promise<{}>;
    post(): Promise<{}>;
    remove(): Promise<{}>;
}
