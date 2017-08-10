const LocalStorage = require('../custom_modules/local-storage');

const type = {
  save : (type,data,location,filename)=>{
    return new Promise((resolve,reject)=>{
      const storage = new LocalStorage({ baseDirectory : type+'s'});
      storage.write(data,location,filename).then(resolve).catch(reject);
    })
  },
  remove : (type,id,location)=>{
    return new Promise((resolve,reject)=>{
      const storage = new LocalStorage({ baseDirectory : type+'s' });
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
};

// const path = require("path");
// const s3module = require("../custom_modules/amazons3");
// const s3 = new s3module();


module.exports ={
  types : {
    cell : {
      save : (data,location,filename)=>{
        return type.save('cell',data,location,filename)
      },
      remove : (id,location)=>{
        return type.remove('cell',id,location)
      },
      getOne : (id)=>{
        return type.getOne(id)
      },
      getAll : ()=>{
        return type.getAll()
      }
    },
    generator : {
      save : (data,location,filename)=>{
        return type.save('generator',data,location,filename)
      },
      remove : (id,location)=>{
        return type.remove('generator',id,location)
      },
      getOne : (id)=>{
        return type.getOne(id)
      },
      getAll : ()=>{
        return type.getAll()
      }
    }
  }
}
