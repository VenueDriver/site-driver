const LocalStorage = require("./local-storage");
const path = require('path');

let   s3 = require("./amazons3");
s3 = new s3();

class S3Storage extends LocalStorage{
  constructor(opts){
    super(opts);
    this.fs = s3.moleculeBucket.fs;
    this.encoding = false;
  }

  write(data,location,filename){
    return new Promise((resolve,reject)=> {
      let opts = {};
      if(this.query.format === "readable"){
        opts.ACL = 'public-read';
      }
      location = path.join(this.opts.root,location);
      this.fs.writeFile(path.join(location,filename) , data , opts ,(err)=>{
        if(err){ return reject(err) } else { return resolve() }
      })
    })
  }
}

module.exports = S3Storage;
