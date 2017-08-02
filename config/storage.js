const LocalStorage = require('../custom_modules/local-storage');

// const path = require("path");
// const s3module = require("../custom_modules/amazons3");
// const s3 = new s3module();


module.exports ={
  types : {
    cell : {
      save : (data,location,filename)=>{
        return new Promise((resolve,reject)=>{
          const storage = new LocalStorage({ baseDirectory : 'cells'});
          storage.write(data,location,filename).then(resolve).catch(reject);
        })
      },
      remove : (id,location)=>{        
        return new Promise((resolve,reject)=>{          
          const storage = new LocalStorage({ baseDirectory : 'cells' });
          storage.remove(id,location).then(resolve).catch(reject);
        });
      },
      getOne : (id)=>{
        return new Promise((resolve,reject)=>{
          const storage = new LocalStorage({ baseDirectory : 'cells' });
          storage.readFile('original',id).then((data)=>{
            resolve(stringToJSON(data));
          }).catch(reject);
        });
      },
      getAll : ()=>{
        return new Promise((resolve,reject)=>{
          const storage = new LocalStorage({ baseDirectory : 'cells' });
          storage.readdir('original',{readFiles : true}).then(resolve).catch(reject);
        });
      }
    }
  }
}
