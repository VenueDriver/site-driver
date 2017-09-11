const LocalStorage = require("./local-storage");
let   s3 = require("./amazons3");
s3 = new s3();

class S3Storage extends LocalStorage{
  constructor(opts){
    super(opts);
    this.fs = s3.moleculeBucket.fs;
    this.encoding = false;
  }
}

module.exports = S3Storage;
