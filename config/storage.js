const LocalStorage = require('../custom_modules/local-storage');
const rootStorageFolder = "_storage";

const type = {
  save : (type,data,location,filename)=>{
    return new Promise((resolve,reject)=>{
      const storage = new LocalStorage({ baseDirectory : rootStorageFolder+'/'+type+'s'});
      storage.write(data,location,filename).then(resolve).catch(reject);
    })
  },
  remove : (type,id,location)=>{
    return new Promise((resolve,reject)=>{
      const storage = new LocalStorage({ baseDirectory : rootStorageFolder+'/'+type+'s' });
      storage.remove(id,location).then(resolve).catch(reject);
    });
  },
  getOne : (type,id)=>{
    return new Promise((resolve,reject)=>{
      const storage = new LocalStorage({ baseDirectory : rootStorageFolder+'/'+type+'s' });
      storage.readFile(type+'s/original',id+'.json').then((data)=>{
        resolve(data);
      }).catch(reject);
    });
  },
  getAll : (type)=>{
    return new Promise((resolve,reject)=>{
      const storage = new LocalStorage({ baseDirectory : rootStorageFolder+'/'+type+'s' });
      storage.readdir('original',{readFiles : true}).then(resolve).catch(reject);
    });
  }
};


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
        return type.getOne('cell',id)
      },
      getAll : ()=>{
        return type.getAll('cell')
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
        return type.getOne('generator',id)
      },
      getAll : ()=>{
        return type.getAll('generator')
      }
    },

    instance : {
      save : (type,data,location,filename)=>{
        return new Promise((resolve,reject)=>{
          const storage = new LocalStorage({ baseDirectory : rootStorageFolder+'/'+type+'s'});
          storage.write(data,location,filename).then(resolve).catch(reject);
        })
      },
      remove : (type,id,location)=>{
        return new Promise((resolve,reject)=>{
          const storage = new LocalStorage({ baseDirectory : rootStorageFolder+'/'+type+'s' });
          storage.remove(id,location).then(resolve).catch(reject);
        });
      },
      getOne : (type,id)=>{
        return new Promise((resolve,reject)=>{
          const storage = new LocalStorage({ baseDirectory : rootStorageFolder+'/'+type+'s' });
          storage.readFile(type+'s/original',id+'.json').then((data)=>{
            resolve(data);
          }).catch(reject);
        });
      },
      getAll : (type)=>{
        return new Promise((resolve,reject)=>{
          const storage = new LocalStorage({ baseDirectory : rootStorageFolder+'/'+type+'s' });
          storage.readdir('original',{readFiles : true}).then(resolve).catch(reject);
        });
      }
    }

  }
}
