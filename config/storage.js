const LocalStorage = require('../custom_modules/local-storage');
const uniqid = require('uniqid');
const path = require('path');
const rootStorageFolder = "_storage";

class StorageRoutes{

  constructor(query){
    this.query = query;
    // console.log(this.query);
    // if(typeof this.query.readFiles !== "undefined") this.query.readFiles = true;
    // switch(query.type){
    //   case 'instance':
    //     console.log("Is instance");
    //     if(!this.query.hasOwnProperty("name")) this.query.name = '';
    //     this.storeInLocation = path.join(rootStorageFolder,this.query.type,this.query.name);
    //     this.filename = this.query.id+'.json';
    //     console.log(this.storeInLocation,this.filename);
    //     break;
    //   default:
    //     this.storeInLocation = path.join(rootStorageFolder,this.query.type);
    //     this.filename = this.query.name+'.json';
    //   console.log("Constructor end");
    // }
    this.localStorage = new LocalStorage({ root: rootStorageFolder , query : this.query });
  }

  save(){
    return this.localStorage.post();
    // return this.storage.write( JSON.stringify(this.query.formattedData) , this.query.format , this.filename);
  }

  remove(){
    return this.localStorage.remove();
    // return this.storage.remove(this.query.id,this.query.format);
  }

  get(){
    return this.localStorage.get();
  }

}

module.exports = StorageRoutes;
