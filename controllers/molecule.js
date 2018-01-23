const Publisher = require( "../custom_modules/publisher" );
const uniqid = require('uniqid');
const moment = require("moment");

const validate = (data)=>{
  return new Promise((resolve,reject)=>{
    if(data._name){
      resolve(data._name);
    }else{
      reject("Data has no '_name'");
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
    if(!query.id){
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
      ((query.format) ? publisher.publish(query.format,query.data) : publisher.publishAll())
      .then((data)=>{
        if((query.data.hasOwnProperty("_generator"))){
          updateGenerator(query).then(resolve).catch(reject);
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
  return new Promise((resolve,reject)=>{
    const publisher = new Publisher(query);
    publisher.unpublishAll().then((response)=>{
      if((query.data.hasOwnProperty("_generator"))){
        updateGenerator(query).then(resolve).catch(reject);
      }else{
        resolve(response);
      }
    }).catch(reject);
  });
}

const get = (query,format = 'original')=>{
  const publisher = new Publisher(query);
  return publisher.get(format);
}

const updateGenerator = (query)=>{
  let generator = query.data._generator;
  return new Promise((resolve,reject)=>{
    console.log("Updating generator",JSON.stringify(generator));
    get({
      type : ["instance"],
      name : generator._options._molecule_types._value.map(value=>value._name),
      where : {
        _generator : {
          _name : generator._name,
          _id : generator._id
        }
     }
   }).then((generatorNewInstances)=>{
    //  console.log("\n\n\n\nreadable instances:",generatorNewInstances[0]);

     generator._value = generatorNewInstances;
     save({
       type : generator._type,
       name : generator._name,
       id   : generator._id,
       data : generator,
       format : "readable",
       nonRecursive : true
     }).then(()=>{

       generator._value = [];
       console.log("Updating gnerator id",generator._id);
       save({
         type : generator._type,
         name : generator._name,
         id   : generator._id,
         data : generator,
         format : "original",
         nonRecursive : true
        }).then(resolve).catch(reject);

      }).catch(reject);
     }).catch(reject);
  })
}

module.exports = {
  save : save,
  remove : remove,
  get : get
};
