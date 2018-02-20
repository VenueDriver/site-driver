declare const server: {
    get: (query: any) => Promise<{}>;
    post: (query: any) => Promise<{}>;
    delete: (query: any) => Promise<{}>;
};
export = server;
