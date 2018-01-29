const StorageRoutes = require('../config/storage');
const storage = new StorageRoutes({ format : 'original' , type : ['cell','generator','instance'] });
// const cellsStorage = new StorageRoutes({ format : 'original' , type : ['cell'] });
// const generatorsStorage = new StorageRoutes({ format : 'original' , type : ['generator'] });
// const instancesStorage = new StorageRoutes({ format : 'original' , type : ['instance'] , where : { _name : "Blog" } });
const asyncLoop = require('../custom_modules/asyncloop');
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
       console.log("Saving.");
       storageInstance.save().catch(end).then(()=>{ i++ ; next(); });
      },
      (err)=>{
       if(err){
          console.error(err);
          console.log("Exiting with errors...");
          process.exit(1);
       }else{
          console.log("Exiting...");
          process.exit(0);
       }
      }
   );
 });

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
