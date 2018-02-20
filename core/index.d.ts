declare const core: {
    assets: (opts?: object | undefined) => (req: any, res: any, next: any) => void;
    client: {
        app: (req: any, res: any) => void;
    };
    server: {
        get: (query: any) => Promise<{}>;
        post: (query: any) => Promise<{}>;
        delete: (query: any) => Promise<{}>;
    };
};
export = core;
