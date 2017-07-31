const path = require("path");

class StorageAdapter{

  constructor(configuration){
    this.adapter = configuration.types;
  }

  input(type,data,container,name){
    return new Promise((resolve,reject)=>{
      let output = this.adapter[type];
      output(data,container,name).then(resolve).catch(reject);
    })
  }

}

module.exports = StorageAdapter;
