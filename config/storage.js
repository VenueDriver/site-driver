const LocalStorage = require('../custom_modules/local-storage');
const path = require('path');
const rootStorageFolder = "_storage";

class StorageRoutes{

  constructor(query){
    this.query = query;
    if(typeof this.query.readFiles !== "undefined") this.query.readFiles = true;
    switch(query.type){
      case 'instance':
        this.storeInLocation = path.join(rootStorageFolder,query.type,query.name);
        this.filename = query.id+'.json';
      default :
        this.storeInLocation = path.join(rootStorageFolder,query.type);
        this.filename = query.name+'.json';
    }
    // USE SAME STORAGE FOR ALL?
    // YOU CAN CREATE A CONDITION TO CHANGE THE STORAGE HERE
    this.storage = new LocalStorage({ baseLocation : this.storeInLocation });
  }

  save(){
    let data = JSON.stringify(this.query.formattedData);
    return this.storage.write(data,this.query.format,this.filename);
  }

  remove(){
    console.log("Trying to remove",this.query);
    return this.storage.remove(this.query.id,this.query.format);
  }

  get(){
    return new Promise((resolve,reject)=>{
      this.storage.readdir(this.query.format,{readFiles : true}).catch(reject).resolve((list)=>{
        console.log(this.query.where);
        if(this.query.hasOwnProperty("where")){
          list.filter((item)=>{
            for(let key in this.query.where){
              if(!item[key] === this.query.where[key]){
                return false;
              }
            }
          });
          resolve(list);
        }
      });
    })
  }

}

module.exports = StorageRoutes;
