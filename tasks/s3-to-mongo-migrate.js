const StorageRoutes = require('../config/storage');
const storage = new StorageRoutes({ format : 'original' , type : ['instance','cell','generator'] });
const asyncLoop = require('../custom_modules/asyncLoop');
const uniqid = require('uniqid');

storage.get().catch(err => console.error(err))
  .then((molecules)=>{
    let i = 0;
    let stopAt = molecules.length;
    asyncLoop(
      ()=> i >= stopAt,
      (next,end)=>{
        let molecule = molecules[i];
        if(!molecule._id) molecule._id = uniqid();
        let query = {
          id : molecule._id,
          formattedData : molecule,
          name : molecule._name,
          type : molecule._type,
          format : 'original'
        };
        let storageInstance = new StorageRoutes(query);
        storageInstance.save().catch(end).then(()=>{ i++ ; next(); });
      },
      (err)=>{
        if(err){
          console.error(err);
          process.exit(1);
        }else{
          process.exit(0);
        }
      }
    );
  });
