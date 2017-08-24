const LocalStorage = require('../custom_modules/local-storage');
const uniqid = require('uniqid');
const path = require('path');
const rootStorageFolder = "_storage";

class StorageRoutes{

  constructor(query){
    this.query = query;
    this.localStorage = new LocalStorage({ root: rootStorageFolder , query : this.query });
  }

  save(){
    return this.localStorage.post();
  }

  remove(){
    return this.localStorage.remove();
  }

  get(){
    return this.localStorage.get();
  }

}

module.exports = StorageRoutes;
