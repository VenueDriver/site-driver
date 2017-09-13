const LocalStorage = require('../custom_modules/local-storage');
const S3Storage    = require('../custom_modules/s3-storage');

const uniqid = require('uniqid');
const path = require('path');
const rootStorageFolder = "_storage";

class StorageRoutes{

  constructor(query){
    this.query = query;

    let storageOptions ={ root: rootStorageFolder , query : this.query };

    this.localStorage = new LocalStorage(storageOptions);
    this.remoteStorage =new S3Storage(storageOptions);
    // console.log("REMOTE",this.remoteStorage);
  }

  save(){
    return new Promise((resolve,reject)=>{
      this.remoteStorage.post().then(resolve
        // ()=>{
        // this.localStorage.post().catch(reject).then(resolve);
        // }
      ).catch(reject);
    });
  }

  remove(){
    return new Promise((resolve,reject)=>{
      this.remoteStorage.remove().then(resolve
        // ()=>{
        //   this.localStorage.remove().catch(reject).then(resolve);
        // }
      ).catch(reject);
    });
  }

  get(){
    // return this.localStorage.get();
    return this.remoteStorage.get();
  }

}

module.exports = StorageRoutes;
