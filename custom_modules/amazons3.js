const colors    = require("colors");
const path      = require("path");
const asyncLoop = require("./asyncloop");
const TimeTrack = require("./timetrack");
const S3FS      = require('s3fs');
let s3fsImplData = new S3FS('data.portaldriver.com' ,
  {
    accessKeyId : process.env.S3KEY,
    secretAccessKey : process.env.S3SECRET
  })
let s3fsImpl = new S3FS('assets.portaldriver.com' ,
  {
    accessKeyId : process.env.S3KEY,
    secretAccessKey : process.env.S3SECRET
  })
let s3fsImplMolecule = new S3FS('molecule.portaldriver.com' ,
  {
    accessKeyId : process.env.S3KEY,
    secretAccessKey : process.env.S3SECRET
  })

module.exports = function (){

  this.exists = ( location , next, s3fsImpl = s3fsImpl)=>{
    const ttrack = new TimeTrack();
    ttrack.start();
    s3fsImpl.exists(location , (exists) =>{
      ttrack.stop();
      // console.log("Elapsed Time:".gray ,(ttrack.result.toFixed(2) + "(ms)").gray);
      next(exists);
    })
  }

  this.delete = ( location , file , next, s3fsImpl = s3fsImpl)=>{
    const ttrack = new TimeTrack();
    ttrack.start();
    console.log(`Deleting ${location}/${file}...`.red);
    s3fsImpl.unlink(path.join(location,file), (err) =>{
      ttrack.stop();
      console.log("Elapsed Time:".gray ,(ttrack.result.toFixed(2) + "(ms)").gray);
      if(err){ console.error(error.red) }
      next(err);
    })
  }

  this.upload = (data,location,file,next, s3fsImpl = s3fsImpl)=>{
    const ttrack = new TimeTrack();
    ttrack.start();
    console.log('[AWS S3]'.magenta ,`Uploading '${location}/${file}'`.green);
    s3fsImpl.mkdirp(location)
      .then(()=>{
        s3fsImpl.writeFile(path.join(location,file) , data , { ACL: 'public-read' } ,(err)=> {
          if(err){ console.error(err.red) }
          ttrack.stop();
          console.log((ttrack.result.toFixed(2) + "(ms)").gray, "\n");
          next();
        })

      })
  }

  this.fs = s3fsImpl;
  this.dataBucket = {
    fs : s3fsImplData
  };
  this.moleculeBucket = {
    fs : s3fsImplMolecule
  };
  return this;

}
