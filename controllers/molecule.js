const Publisher = require( "../custom_modules/publisher" );
const asyncLoop = require( "../custom_modules/asyncloop" );
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




const cellMigration = (cellID)=>{

  return new Promise((resolve,reject)=>{
    get({
      type : ["cell"],
      id: cellID
    }).then((cell)=>{
      cell = cell[0];


      const migrate = (cell,instance)=>{

        // console.log("\n\n\n\n cellMigration.migrate() CELL:\n",cell,"\n\nWith:\n",instance);

        const excluded_keys = [
          "_id",
          "_instance_of",
          "_type",
          "_created_at",
          "_updated_at",
          "_generator"
        ]

        // IF CELL AND INSTANCE ARE THE SAME
        if( cell._id === instance._id ){
          // console.log("instance and cell are the same");
          return instance;
        }

        // IF NOT AN INSTANCE OF
        if( cell._id !== instance._instance_of ){
          // console.log("instance is not made of cell");
          return instance;
        }

        console.log("Start merge");

        // MERGE
        for(let key in cell){
          if(!excluded_keys.includes(key)){
            if( key !== "_value" || typeof cell._value !== typeof instance._value ){
              instance[key] == cell[key];
            }
          }
        }

        // RE-ARRANGE AND REMOVE UNEXISTING VALUES

        if(Array.isArray(cell._value)){
          let tmp_value = [];
          cell._value.forEach( cell_value =>{
            var value_match = instance._value.find( instance_value =>{
              return instance_value._name === cell_value._name;
            });
            console.log("Value_match",value_match);
            if(value_match){
              console.log("Proper match using:",value_match);
              tmp_value.push(value_match);
            }else{
              console.log("No match using:",cell_value);
              tmp_value.push(cell_value);
            }
          });
          instance._value = tmp_value;
        }



        return instance;
      }

      const deepLoop = (array,work)=>{
        return array.map((instance)=>{
          if(instance._value && Array.isArray(instance._value)){
            instance._value = deepLoop(instance._value,work);
          }
          return work(instance);
        });
      }

      get({ type : ["instance","cell"] }).then((instances)=>{
        let i = 0;
        asyncLoop(
          ()=> i >= instances.length,
          (next,end)=>{
            // console.log("PRE MIGRATE INSTANCE",instances[i]);
            instances[i] = migrate(cell,instances[i]);
            if(instances[i]._value && Array.isArray(instances[i]._value)){
              instances[i]._value = deepLoop(instances[i]._value,(instance)=>{
                return migrate(cell,instance);
              });
            }
            // console.log("SAVING INSTANCE:",'\n',instances[i]);
            save({
              type : instances[i]._type,
              name : instances[i]._name,
              id   : instances[i]._id,
              data : instances[i],
              nonRecursive : true,
              skip_generator_update : true,
              noMigration : true
             }).then(()=>{
              i++;
              console.log("Done moving to next",i,"/",instances.length);
              next();
            }).catch(reject);
          },
          ()=>{
            resolve();
          }
        );
      });







    }).catch(reject);




  });
}

// EASY ALIAS TO TRIGGER VALIDATION, SANITAZION AND STORAGE OF DATA
const save = (query)=>{

    /*
      EVERY TIME A CELL IS UPDATED
      ALL INSTANCES SHARING THE SAME CELL MODEL SHOULD BE UPDATED ASWELL
    */

  return new Promise((resolve,reject)=>{
    if(query.type === "instance" && !query.data._instance_of){
      query.data._instance_of = query.data._id;
      query.id = uniqid();
      query.data._id = query.id;
    }
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
      publisher.publishAll().then((data)=>{
        if((query.data.hasOwnProperty("_generator") && query.skip_generator_update !== true)){
          updateGenerator(query).then(resolve).catch(reject);
        }else{
          if(query.type === "cell" && query.noMigration !== true){
            cellMigration(query.id).then(()=>{
              resolve(data);
            }).catch(reject)
          }else{
            resolve();
          }
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
      updateGenerator(query).then(resolve).catch(reject);
    }).catch(reject);
  });
}

const get = (query,format = 'original')=>{
  const publisher = new Publisher(query);
  return publisher.get(format);
}

const updateGenerator = (query)=>{
  return new Promise((resolve,reject)=>{
    console.log("Updating generator");
    let generator = query.data._generator;
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
       nonRecursive : true
      }).then(resolve).catch(reject);
    }).catch(reject);
  })
}



module.exports = {
  save : save,
  remove : remove,
  get : get
};
