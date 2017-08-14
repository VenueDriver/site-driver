const path = require("path");

class StorageAdapter{

  constructor(configuration){
    this.adapter = configuration.types;
  }

  input(type,data,container,name){
    return new Promise((resolve,reject)=>{
      this.getAdapter(type).then((hasAdapter)=>{
        this.adapter[type].save(data,container,name).then(resolve).catch(reject);
      }).catch(reject);
    })
  }

  getAll(type){
    return new Promise((resolve,reject)=>{
      this.getAdapter(type).then((hasAdapter)=>{
        this.adapter[type].getAll().then(resolve).catch(reject);
      }).catch(reject);
    })
  }

  getOne(type,id){
    return new Promise((resolve,reject)=>{
      this.getAdapter(type).then((hasAdapter)=>{
        this.adapter[type].getOne(id).then(resolve).catch(reject);
      }).catch(reject);
    })
  }

  remove(type,id,location){
    return new Promise((resolve,reject)=>{
      this.getAdapter(type).then((hasAdapter)=>{
        this.adapter[type].remove(id,location).then(resolve).catch(reject);
      }).catch(reject);
    })
  }

  getAdapter(type){
    return new Promise((resolve,reject)=>{
      if(this.adapter.hasOwnProperty(type)){
        resolve(true);
      }else{
        let error = "Please provide a storage route for type:"+type;
        console.log(error);
        reject({error : error});
      }
    })
  }

}

module.exports = StorageAdapter;
