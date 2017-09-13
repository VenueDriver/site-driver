const Publisher = require( "../custom_modules/publisher" );
const uniqid = require('uniqid');
const moment = require("moment");

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
const save = (query)=>{

    /*
      EVERY TIME A CELL IS UPDATED
      ALL INSTANCES SHARING THE SAME CELL MODEL SHOULD BE UPDATED ASWELL
    */

  return new Promise((resolve,reject)=>{
    if(query.type === "instance" && !query.id){
      query.id = uniqid();
      query.data._id = query.id;
    }
    let unixTimeStamp = moment().format('x');
    if(!query.data.hasOwnProperty("_created_at")){
      query.data._created_at = unixTimeStamp;
    }
    query.data._updated_at = unixTimeStamp;
    // VALIDATE DATA
    validate(query.data).then((validName)=>{
      const publisher = new Publisher(query);
      publisher.publishAll().then((data)=>{
        if(query.data._ngClass === "MoleculeGenerator"){
          get({
            type : ["instance"],
            name : query.data._options._molecule_types._value.map(value=>value._name),
            where : {
              _generator : {
                _name : query.data._name,
                _id : query.data._id
              }
           }
         },'readable').then((generatorNewInstances)=>{
           query.data._value = generatorNewInstances;
           save(query).then(resolve).catch(reject);
         }).catch(reject);
        }else{
          resolve(data);
        }
      }).catch(reject);
    }).catch((errors)=>{
      // REJECT IF DATA COULDN'T GET THROUGH VALIDATION
      console.log("site invalid",errors );
      reject({"error" : errors});
    })
  })
}

const remove = (query)=>{
  const publisher = new Publisher(query);
  return publisher.unpublishAll();
}

const get = (query,format = 'original')=>{
  const publisher = new Publisher(query);
  return publisher.get(format);
}

module.exports = {
  save : save,
  remove : remove,
  get : get
};
