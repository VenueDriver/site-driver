const Publisher = require( "../custom_modules/publisher" );
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
    // VALIDATE DATA
    validate(query.data).then((validName)=>{
      const publisher = new Publisher(query);
      publisher.publishAll().then(resolve).catch(reject);
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

const get = (query)=>{
  const publisher = new Publisher(query);
  return publisher.get('original');
}

module.exports = {
  save : save,
  remove : remove,
  get : get
};
