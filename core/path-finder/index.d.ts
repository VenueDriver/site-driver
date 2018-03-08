declare class RouteInjector {
    plugins: any[];
    routes: any;
    constructor();
    findRoot(moduleName?: string): string;
    mapRoutes(): any;
    buildFront(): Promise<{}>;
}
export = RouteInjector;
