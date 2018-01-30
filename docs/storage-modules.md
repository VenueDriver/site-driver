# Storage Modules

Storage Modules are the standard way of plugging your database, static file storage, or any other tool you want to use to store molecule records.

You can use any of the existing storage modules:

1. LocalStorage
2. EmptyStorage
3. S3Storage
4. MongoStorage

Or search for a third party module that fits your needs. 
There's a third option and that's creating your own. You can easily do that by following these simple rules:

1. It must be a Class with a constructor receiving a standard Molecule Driver [Query](/query-class).
2. It must provide at least the three basic methods `get()`,`post()` and `remove()`.
3. Each basic method should be able to fulfill its purpose using a `Query`.
4. Each basic method should return a Promise for the corresponding result.

## Examples of custom storage modules

### `MongoStorage : Class`
```javascript
const QueryFilter = require('../custom_modules/query-filter');
const mongo       = require('mongodb');
const mongoose    = require('mongoose');
const MoleculeModel = require('../definitions/schemas/molecule');
const asyncLoop = require('../custom_modules/asyncloop');

mongoose.connect(process.env.MONGODB_URI ,{ useMongoClient: true });
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
              // molecules.forEach((molecule)=> fs.writeFileSync(__dirname+"/test/"+molecule._id, JSON.stringify(molecule) , 'utf-8' ));
              // molecules.forEach(molecule => console.log(`${molecule._type} | ${molecule._name} | ${molecule._id}`))
              // fs.writeFileSync(__dirname+"/test/mongo_result_"+new Date().getTime(), JSON.stringify(molecules) , 'utf-8' )
              const queryFilter = new QueryFilter(this.query);
              let res = queryFilter.filter(molecules);
              resolve(res);
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

```