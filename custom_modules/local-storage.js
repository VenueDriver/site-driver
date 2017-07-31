const path = require("path");
const fs = require("fs");
const mkdirp = require("mkdirp-promise");


class LocalStorage{

  constructor(opts){
    this.baseDirectory = opts.baseDirectory || '';
  }

  write(data,location,filename){
    return new Promise((resolve,reject)=> {
      location = path.join(this.baseDirectory,location);
      mkdirp(location).then(()=>{
        fs.writeFile(path.join(location,filename) , data ,(err)=>{
          if(err){ return reject(err) } else { return resolve() }
        })
      }).catch(reject);
    })
  }


}


module.exports = LocalStorage;
