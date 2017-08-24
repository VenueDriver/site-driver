const LocalStorage = require('../custom_modules/local-storage');
const QueryFilter = require('../custom_modules/query-filter');
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
    this.localStorage = new LocalStorage({ query : this.query });
  }

  save(){
    return this.localStorage.save();
    // return this.storage.write( JSON.stringify(this.query.formattedData) , this.query.format , this.filename);
  }

  remove(){
    return this.localStorage.remove();
    // return this.storage.remove(this.query.id,this.query.format);
  }

  get(){
    return this.localStorage.get();
    // console.log("GET STORAGE");
    // return new Promise((resolve,reject)=>{
    //   console.log("\n\n=======================\n\n","Request received, Criteria:",this.query,"\n\n--------------------------------");
    //   this.storage.readdir(this.query.format,{readFiles : true}).catch(reject).then((list)=>{
    //     const queryFilter = new QueryFilter(this.query);
    //     let filterList = list.filter((item)=>{
    //       let valid = queryFilter.filter(item);
    //       console.log(item._name,item._type,"\n\nCriteria:",this.query,"\n\nValid:",valid,'\n\n--------------------------------');
    //       return valid;
    //     });
    //     console.log("\n\nResults count:",filterList.length);
    //     resolve(filterList);
    //   });
    // })
  }

}

module.exports = StorageRoutes;
