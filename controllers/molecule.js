const Publisher = require( "../custom_modules/publisher" );
const StorageAdapter = require( "../custom_modules/storage-adapter" );

const storageConfig = require('../config/storage');
const storageAdapter = new StorageAdapter(storageConfig);


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
const save = (req,type)=>{
  return new Promise((resolve,reject)=>{
    let molecules = Object.assign({},req.body);
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

module.exports.cell = {
  save : (req,res) => save(req,"cell")
};
