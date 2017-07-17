const fs = require("fs");
const mkdirp = require("mkdirp");
const path = require("path");
const asyncLoop = require("../custom_modules/asyncloop");
let   s3 = require("../custom_modules/amazons3");
s3 = new s3();


const list = (path)=>{

  return new Promise((resolve,reject)=>{
    s3.fs.readdir(path,(err,data)=>{
      if(err){
        throw err;
        data = err;
      }
      resolve(data);
    })
  });

}

const addFolder = (path)=>{
  return new Promise((resolve,reject)=>{
    s3.fs.mkdir(path,(err)=>{
      if(err){
        throw err;
      }
      resolve(err);
    })
  });

}


const addFile = (path,file)=>{
  return new Promise((resolve,reject)=>{
    // READ TMP FILE
    let rstream = fs.createReadStream('./uploads/tmp/'+file.filename);
    // WRITE LOCAL FILE
    let s3Location = path+'/'+file.filename+(file.originalname.match(/\.\w+$/,'')[0]);
    let wstream = s3.fs.createWriteStream(s3Location,{ ACL: 'public-read' });
    rstream.pipe(wstream);
    wstream.on('finish', ()=>{  // done
      // DELETE TMP FILE
      fs.unlink('./uploads/tmp/'+file.filename,()=>{
        // UPLOAD LOCAL FILE TO S3
        resolve("//s3-us-west-1.amazonaws.com/assets.portaldriver.com/"+s3Location);
      });
    });
  })

}


const remove = (path)=>{

  console.log("Deleting file",path);
  return new Promise((resolve,reject)=>{
    s3.fs.unlink(path,(err)=>{
      if(err){
        throw err;
      }
      resolve(err);
    })
  });

}


module.exports.list       =   list;
module.exports.addFolder  =   addFolder;
module.exports.addFile    =   addFile;
module.exports.remove     =   remove;
