const QueryFilter = require('../custom_modules/query-filter');
const mongo       = require('mongodb');
const mongoose    = require('mongoose');
const MoleculeModel = require('../definitions/schemas/molecule');
const asyncLoop = require('../custom_modules/asyncloop');
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/loginapp',{ useMongoClient: true });
const db          = mongoose.connection;
zlib              = require('zlib');
zlib.Z_DEFAULT_COMPRESSION = 9


class MongoStorage{

  constructor(opts){
    this.opts = {};
    Object.keys(opts).forEach((key)=>{
      this.opts[key] = opts[key];
    });
    this.query = Object.assign({},opts.query);
    this.mongooseQuery = {};
    if(this.query.id){
      this.mongooseQuery._id = this.query.id;
    }else{
      if(this.query.type) this.mongooseQuery._type = { $in: this.query.type };
      if(this.query.name) this.mongooseQuery._name = { $in: this.query.name };
    }
    if(this.query.format) this.mongooseQuery._format = this.query.format;
  }

  get(){
    return new Promise((resolve,reject)=>{
      console.log("MongoDB: GET - ",this.mongooseQuery);
      MoleculeModel.find(this.mongooseQuery).exec((err, mongoResult)=>{

        let i = 0;
        let molecules = [];
        asyncLoop(
          ()=> i >= mongoResult.length,
          (next,end)=>{
            zlib.gunzip(mongoResult[i]._value,(err,decoded)=>{
              if(err){
                console.error(err);
              }else{
                molecules.push(JSON.parse(decoded.toString('utf-8')));
              }
              i++;
              next();
            })
          },
          (err)=>{
            if (err) {
              reject(err)
            } else {
              // molecules.forEach(molecule => console.log(`${molecule._type} | ${molecule._name} | ${molecule._id}`))
              const queryFilter = new QueryFilter(this.query);
              resolve(queryFilter.filter(molecules))
            }
          }
        )
      })
    });
  }

  post(){
    return new Promise((resolve,reject)=>{
      let buf = new Buffer(JSON.stringify(this.query.formattedData), 'utf-8')
      zlib.gzip(buf,(err,compressed)=>{
        let data = {
          _id   : this.query.id,
          _value : compressed,
          _name : this.query.name,
          _type : this.query.type,
          _format : this.query.format
        };

        console.log(`MongoDB: Saving ${data._type}/${data._name}/${data._id}`);
        console.log(data);
        MoleculeModel.update({_id : data._id},data,{upsert: true},(err,result)=>{
          if(err){
            console.log("MongoDB: "+err);
            reject(err);
          }else{
            console.log("MongoDB: Saved.");
            resolve(null);
          }
        })


      });
    })
  }

  remove(){
    return new Promise((resolve,reject)=>{
      console.log(`\nMongoDB: Deleting - ${JSON.stringify(this.mongooseQuery)}\n`);
      MoleculeModel.deleteMany(this.mongooseQuery,(err)=>{
        if (err) {
          reject(err);
        }else{
          resolve(null);
        }
      });
    })
  }

}

module.exports = MongoStorage;
