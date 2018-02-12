export interface StorageModule {
    get(): Promise<any>;
    post(): Promise<any>;
    remove(): Promise<any>;
}
