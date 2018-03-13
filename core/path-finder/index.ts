import path = require('path');
import fs = require('fs-extra');
import asyncloop = require('flexible-asyncloop');
import colors = require('colors/safe');
import cp = require('child_process');

const MD = {
  plugins : () => { return [{
    name : 'plugin',
    front : {
      ngModule : 'src/app/cell-builder/module#CellBuilderModule',
      ngRoute : {
        path : '/cell-builder'
      }
    }
  }]}
};

class RouteInjector{

  plugins : any[] = [];
  routes : any = {};

  constructor(){
    this.plugins = MD.plugins();
  }

  findRoot(moduleName : string = ''){
    let result = path.join(require.resolve('@molecule-driver/molecule'),'/../../',moduleName);
    return result;
  }

  mapRoutes(){
    // Map plugin assets to client destination
    this.routes.root = this.findRoot();
    this.plugins.forEach(plugin =>{
      let route = this.routes[plugin.name] = {};
      if(plugin.front){
        route.front = {
          src : path.join(this.findRoot(plugin.name),'/front'),
          dest : path.join(this.findRoot('client'),'/front/src/app/build/',plugin.name)
        }
      }
    });
    return this.routes;
  }

  buildFront(){
    return new Promise((resolve,reject)=>{
      let routeNames = Object.keys(this.mapRoutes()).filter(name => name != 'root');
      let i = 0;

      asyncloop(
        ()=> i >= routeNames.length,
        (next,end)=>{
          let route = this.routes[routeNames[i]];


          console.log('');
          console.log(colors.bgWhite.bold.black(' COPYING "'+routeNames[i]+'" '));
          console.log(colors.cyan(route.front.src)+ ' ==> ' + colors.green(route.front.dest));

          cp.exec('npm i', { cwd : path.join(route.front.src)} ,(error, stdout, stderr) =>{
            if(!error){
              fs.copy(route.front.src, route.front.dest , function (err) {
                if(err){
                  end(true);
                }else{
                  i++;
                  next();
                }
              });
            }else{
              end(true);
            }
          });


        },
        (err)=>{
          if (err){
            reject(err);
          }else{
            console.log("npm run dev");
            cp.exec('npm run dev', { cwd : path.join(this.findRoot('client'),'/front')} ,(error, stdout, stderr) =>{
              console.log("npm run dev done. Error:",error);
              if(!error){
                resolve();
              }else{
                reject(error);
              }
            });
          };
        }
      )

    });
  }

}

export = RouteInjector;
