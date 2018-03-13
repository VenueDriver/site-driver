import fs = require('fs');

class Plugin{

  _data : any = {};

  constructor(opt){
    this._data = {
      front : {
        ngModule : opt.ngModule,
        ngRoute : {
          path : opt.route
        }
      }
    }
  }

  export(){
    let metadata = JSON.parse(fs.readFileSync('./package.json','utf-8'));
    this._data.name = metadata.name;
    return this._data;
  }

}

export = Plugin;
