const StorageRoutes = require('../config/storage');
const generatorsStorage = new StorageRoutes({ format : 'original' , type : ['generator'] });
// const cellsStorage = new StorageRoutes({ format : 'original' , type : ['cell'] });
// const generatorsStorage = new StorageRoutes({ format : 'original' , type : ['generator'] });
// const instancesStorage = new StorageRoutes({ format : 'original' , type : ['instance'] , where : { _name : "Blog" } });
const asyncLoop = require('../custom_modules/asyncloop');
const uniqid = require('uniqid');


generatorsStorage.get().catch(err => console.error(err))
  .then((prime_generators)=>{

    const ensureID = (molecules)=>{
      return new Promise((resolve,reject)=>{
        let i = 0;
        asyncLoop(
          ()=> i >= molecules.length,
          (next,end)=>{
            let molecule = molecules[i];
            console.log("Analyzing: "+`${molecule._type} | ${molecule._name} | ${molecule._id}`)
            if(molecule._id.length < 1){
              molecule._id = uniqid();
            }
            if(molecule._ngClass === "MoleculeGenerator"){
              molecule._value = [];
            }
            let query = {
              id : molecule._id,
              formattedData : molecule,
              name : molecule._name,
              type : molecule._type,
              format : 'original'
            };
            let saveGeneratorStorage = new StorageRoutes(query);
            console.log("Saving...");
            saveGeneratorStorage.save().catch(end).then(()=>{
              console.log("Saved");
              if(molecule._ngClass === "MoleculeGenerator"){
                console.log("Molecule is Generator");
                let query = {
                  name : molecule._options._molecule_types._value.map(type => type._name),
                  type : ['instance'],
                  format : 'original',
                  where : {
                    _generator : {
                      _name : molecule._name,
                      _type : molecule._type,
                      _options : {
                        _title : molecule._options._title
                      }
                    }
                  }
                };
                let generatorInstances = new StorageRoutes(query);
                generatorInstances.get().catch(err => console.log(err))
                  .then((gInstances)=>{
                    console.log("Generator instances "+gInstances.length);
                    gInstances.forEach((instance,n,arr) =>{
                      if(instance.hasOwnProperty("_generator")){
                        console.log("Adding molecule#"+molecule._id+" as generator.");
                        gInstances[n]._generator = molecule;
                      }
                    })
                    ensureID(gInstances).then(()=>{ i++;next(); })
                  });
              }else{
                i++ ; next();
              }
            });

          },
          ()=>{
            resolve(null);
          }
        );
      })
    };


    ensureID(prime_generators).then(()=>{
      process.exit(0);
    });
  }
);



// storage.get().catch(err => console.error(err))
//   .then((molecules)=>{
//    let i = 0;
//    let stopAt = molecules.length;
//    asyncLoop(
//       ()=> i >= stopAt,
//       (next,end)=>{
//        let molecule = molecules[i];
//        if(!molecule._id) molecule._id = uniqid();
//        let query = {
//         id : molecule._id,
//         formattedData : molecule,
//         name : molecule._name,
//         type : molecule._type,
//         format : 'original'
//        };
//        let storageInstance = new StorageRoutes(query);
//        console.log("Saving.");
//        storageInstance.save().catch(end).then(()=>{ i++ ; next(); });
//       },
//       (err)=>{
//        if(err){
//           console.error(err);
//           console.log("Exiting with errors...");
//           process.exit(1);
//        }else{
//           console.log("Exiting...");
//           process.exit(0);
//        }
//       }
//    );
//  });



// cellsStorage.get().catch(err => console.error(err))
//   .then((molecules)=>{
//     let i = 0;
//     let stopAt = molecules.length;
//     asyncLoop(
//       ()=> i >= stopAt,
//       (next,end)=>{
//         let molecule = molecules[i];
//         if(!molecule._id) molecule._id = uniqid();
//         let query = {
//           id : molecule._id,
//           formattedData : molecule,
//           name : molecule._name,
//           type : molecule._type,
//           format : 'original'
//         };
//         let storageInstance = new StorageRoutes(query);
//         console.log("Saving.");
//         storageInstance.save().catch(end).then(()=>{ i++ ; next(); });
//       },
//       (err)=>{
//         if(err){
//           console.error(err);
//           console.log("Exiting with errors...");
//           process.exit(1);
//         }else{
//           console.log("Exiting...");
//           generatorsStorage.get().catch(err => console.error(err))
//             .then((molecules)=>{
//               let i = 0;
//               let stopAt = molecules.length;
//               asyncLoop(
//                 ()=> i >= stopAt,
//                 (next,end)=>{
//                   let molecule = molecules[i];
//                   if(!molecule._id) molecule._id = uniqid();
//                   let query = {
//                     id : molecule._id,
//                     formattedData : molecule,
//                     name : molecule._name,
//                     type : molecule._type,
//                     format : 'original'
//                   };
//                   let storageInstance = new StorageRoutes(query);
//                   console.log("Saving.");
//                   storageInstance.save().catch(end).then(()=>{ i++ ; next(); });
//                 },
//                 (err)=>{
//                   if(err){
//                     console.error(err);
//                     console.log("Exiting with errors...");
//                     process.exit(1);
//                   }else{
//                     console.log("Exiting...");
                    // instancesStorage.get().catch(err => console.error(err))
                    //   .then((molecules)=>{
                    //     let i = 0;
                    //     let stopAt = molecules.length;
                    //     asyncLoop(
                    //       ()=> i >= stopAt,
                    //       (next,end)=>{
                    //         let molecule = molecules[i];
                    //         if(!molecule._id) molecule._id = uniqid();
                    //         let query = {
                    //           id : molecule._id,
                    //           formattedData : molecule,
                    //           name : molecule._name,
                    //           type : molecule._type,
                    //           format : 'original'
                    //         };
                    //         let storageInstance = new StorageRoutes(query);
                    //         console.log("Saving.");
                    //         storageInstance.save().catch(end).then(()=>{ i++ ; next(); });
                    //       },
                    //       (err)=>{
                    //         if(err){
                    //           console.error(err);
                    //           console.log("Exiting with errors...");
                    //           process.exit(1);
                    //         }else{
                    //           console.log("Exiting...");
                    //           process.exit(0);
                    //         }
                    //       }
                    //     );
                    //   });
  //                 }
  //               }
  //             );
  //           });
  //       }
  //     }
  //   );
  // });
