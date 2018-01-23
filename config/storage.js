const LocalStorage = require('../custom_modules/local-storage');
const S3Storage    = require('../custom_modules/s3-storage');
const MongoStorage = require('../custom_modules/mongo-storage');
const EmptyStorage = require('../custom_modules/empty-storage');

const uniqid = require('uniqid');
const path = require('path');
const rootStorageFolder = "_storage";

class StorageRoutes{

  constructor(query){
    this.query = query;

    let storageOptions ={ root: rootStorageFolder , query : this.query };

    this.localStorage = new MongoStorage(storageOptions);
    this.remoteStorage = new EmptyStorage(storageOptions);

    if(process.env.REMOTE_STORAGE){
      this.remoteStorage = new S3Storage(storageOptions);
    }

    // console.log("REMOTE",this.remoteStorage);
  }

  save(){
    // return this.localStorage.post();
    if(this.query.format == 'original'){
      console.log("Saving Original");
      return this.localStorage.post();
    }else{
      console.log("Saving "+this.query.format);
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
    // return this.remoteStorage.get();
    if(this.query.format == 'original'){
      return this.localStorage.get();
    }else{
      return this.remoteStorage.get();
    }
  }

}

module.exports = StorageRoutes;
