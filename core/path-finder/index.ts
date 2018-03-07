/*

- Install plugins dependencies
- Generate client routes based
- Add import modules
- Compile client bundle
- Delete .build modules

*/


import path = require('path');
import fs = require('fs.extra');

const MD = {
  plugins : () => [{
    name : 'cell-builder',
    front : {
      ngModule : 'src/app/cell-builder/module#CellBuilderModule',
      ngRoute : {
        path : '/cell-builder'
      }
    }
  }]
};

export class RouteInjector{

  plugins : any[] = [];
  routes : any = {};

  constructor(){
    this.plugins = MD.plugins();
  }

  findRoot(moduleName : string = ''){
    return path.join(require.resolve('@molecule-driver/client'),'../',moduleName);
  }

  mapRoutes(){
    // Map plugin assets to client destination
    this.routes.root = this.findRoot();
    this.plugins.forEach(plugin =>{
      let route = this.routes[plugin.name];
      if(plugin.front){
        route.front ={
          src : path.join(this.findRoot(plugin.name),'/front'),
          dest : path.join(this.findRoot('client'),'/front/.build')
        }
      }
    });
  }

  buildFront(){
    this.mapRoutes();
    Object.keys(this.routes).filter(name => name != 'root')
    // Copy plugin/front into client/front/.build directory
    .forEach(name =>{
      let route = this.routes[name];
      fs.copyRecursive(route.src, route.dest , { replace: true }, function (err) {
        if (err) throw new Error(err);
      });
    });
  }

}
