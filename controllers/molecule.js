const Publisher = require( "../custom_modules/publisher" );
const StorageAdapter = require( "../custom_modules/storage-adapter" );
const storageConfig = require('../config/storage');
const storageAdapter = new StorageAdapter(storageConfig);
const uniqid = require('uniqid');


const validate = (data)=>{
  return new Promise((resolve,reject)=>{
    if(data._name){
      resolve(data._name);
    }else{
      reject();
    }
  });
}

// EASY ALIAS TO TRIGGER VALIDATION, SANITAZION AND STORAGE OF DATA
const save = (type,molecules)=>{
  return new Promise((resolve,reject)=>{
    molecules = Object.assign({},molecules);
    if(!molecules._id) molecules._id = uniqid();
    // VALIDATE DATA STRUCTURE
    validate(molecules).then((validName)=>{
      // CREATE PUBLISHER AND LINK IT TO THE STORAGE ADAPTER
      const publisher = new Publisher({
        data : molecules,
        basename : validName+'.json',
        storageAdapter : storageAdapter,
        type : type
      });

      // SIMPLE REJECTION
      const errorPublishing = (error)=> reject(error)

      // PUBLISH ALL THREE VERSIONS
      publisher.publishOriginal().then(()=>{
        publisher.publishJSON().then(()=>{
          publisher.publishJSONP().then(()=>{
            resolve();
          }).catch(errorPublishing);
        }).catch(errorPublishing);
      }).catch(errorPublishing);

    }).catch((errors)=>{
      // REJECT IF DATA COULDN'T GET THROUGH VALIDATION
      console.log("site invalid",errors );
      reject({"error" : errors});
    })
  })
}

const remove = (type,molecules)=>{
  return new Promise((resolve,reject)=>{
    molecules = Object.assign({},molecules);
    if(molecules._id){
      const publisher = new Publisher({
        data : molecules,
        basename : molecules._type+'.json',
        storageAdapter : storageAdapter,
        type : type
      });
      // UNPUBLISH ALL THREE VERSIONS
      publisher.unpublish().then(resolve).catch(reject);

    }else{
      reject({error : type+" Does not have an ID"});
    }
  })
}

const get = (type,typeName)=>{
  // TYPE IS THE NAME OF THE NEW CELL TYPE
    if(typeName){
      return storageAdapter.getOne(type,typeName);
    }else{
      return storageAdapter.getAll(type);
    }
}

module.exports = {
  save : save,
  remove : remove,
  get : get
};
