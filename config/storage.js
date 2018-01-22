const LocalStorage = require('../custom_modules/local-storage');
const S3Storage    = require('../custom_modules/s3-storage');
const MongoStorage = require('../custom_modules/mongo-storage');

const uniqid = require('uniqid');
const path = require('path');
const rootStorageFolder = "_storage";

class StorageRoutes{

  constructor(query){
    this.query = query;

    let storageOptions ={ root: rootStorageFolder , query : this.query };

    this.localStorage = new MongoStorage(storageOptions);
    this.remoteStorage =new S3Storage(storageOptions);
    // console.log("REMOTE",this.remoteStorage);
  }

  save(){
    return this.localStorage.post();
    if(this.query.format == 'original'){
      return this.localStorage.post();
    }else{
      return this.remoteStorage.post();
    }
  }

  remove(){
    if(this.query.format == 'original'){
      return this.localStorage.remove();
    }else{
      return this.remoteStorage.remove();
    }
  }

  get(){
    console.log("Get query",this.query);
    return this.remoteStorage.get();
    if(this.query.format == 'original'){
      return this.localStorage.get();
      // return this.remoteStorage.get();
    }else{
      return this.remoteStorage.get();
    }
  }

}

module.exports = StorageRoutes;
