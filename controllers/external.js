const fs = require("fs");
const mkdirp = require("mkdirp");
const path = require("path");
const asyncLoop = require("../custom_modules/asyncloop");
let   s3 = require("../custom_modules/amazons3");
s3 = new s3();


const uploadFile = (req,res,next)=>{

  console.log("Uploading:",req.file.originalname);
  // READ TMP FILE
  let rstream = fs.createReadStream('./uploads/tmp/'+req.file.filename);
  // WRITE LOCAL FILE
  let s3Location = req.body._folder+'/'+req.file.filename+(req.file.originalname.match(/\.\w+$/,'')[0]);
  let wstream = s3.fs.createWriteStream(s3Location,{ ACL: 'public-read' });
  rstream.pipe(wstream);
  wstream.on('finish', ()=>{  // done
    // DELETE TMP FILE
    fs.unlink('./uploads/tmp/'+req.file.filename,()=>{
      // UPLOAD LOCAL FILE TO S3
      next("//s3-us-west-1.amazonaws.com/assets.portaldriver.com/"+s3Location);
    });
  });

}


module.exports.uploadFile = uploadFile;
