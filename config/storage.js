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

    this.mongoStorage = new MongoStorage(storageOptions);
    this.s3Storage    = new S3Storage(storageOptions);
    this.emptyStorage = new EmptyStorage(storageOptions);

    this.localStorage = this.mongoStorage;
    // this.remoteStorage = new EmptyStorage(storageOptions);

    // if(process.env.REMOTE_STORAGE){
      this.remoteStorage = this.s3Storage;
    // }

    // console.log("REMOTE",this.remoteStorage);
  }

  save(){
    if(this.query.format == 'original'){
      console.log("Saving Original");
      return this.localStorage.post();
    }else{
      console.log("Saving "+this.query.format);
      return this.emptyStorage.post();
      // return this.remoteStorage.post();
    }
  }

  remove(){
    if(this.query.format == 'original'){
      return this.localStorage.remove();
    }else{
      return this.emptyStorage.remove();
      // return this.remoteStorage.remove();
    }
  }

  get(){
    return this.remoteStorage.get();
    if(this.query.format == 'original'){
      return this.localStorage.get();
    }else{
      return this.remoteStorage.get();
    }
  }

}

module.exports = StorageRoutes;
