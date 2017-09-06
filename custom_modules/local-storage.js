const path = require("path");
const fs = require("fs");
const QueryFilter = require('../custom_modules/query-filter');
const mkdirp = require("mkdirp-promise");
const asyncLoop = require('./asyncloop');


const stringToJSON = (str)=>{
  try{
    JSON.parse(str);
  }catch(e){
    str = '{error: '+e+'}';
  }
  return JSON.parse(str);
}

class LocalStorage{

  constructor(opts){
    this.opts = {};
    this.opts.root = '_storage';
    this.opts.json = true;
    this.opts.readFiles = true;
    Object.keys(opts).forEach((key)=>{
      this.opts[key] = opts[key];
    });
    this.query = Object.assign({},opts.query);
  }

  getInstanceNames(){
    return new Promise((resolve,reject)=>{
      this.readdir('instance',{readFiles : false}).then((names)=>{
        console.log("Instance names",names);
        resolve(names);
      })
    });
  }

  queryRoutes(){
    return new Promise((resolve,reject)=>{
      let
      types = this.query.type || [],
      names = this.query.name || [],
      routes = [];
      let i = 0;
      console.log("Async loop")
      asyncLoop(
        ()=> i >= types.length,
        (next,end)=>{
          let type = types[i];
          if(type === "instance"){
            if(names.length > 0){
              names.forEach(name =>{
                routes.push(path.join(type,name,this.query.format));
              })
              i++;
              next();
            }else{
              this.getInstanceNames().then((nameList)=>{
                nameList.forEach(name =>{
                  routes.push(path.join(type,name,this.query.format));
                })
                i++;
                next();
              }).catch((err)=>{
                end("Error While getting instance names.");
              })
            }
          }else{
            routes.push(path.join(type,this.query.format));
            i++;
            next();
          }
        },
        (err)=>{
          if(err){
            reject(err);
          }else{
            resolve(routes);
          }
        }
      );



    })
  }

  get(){
    return new Promise((resolve,reject)=>{
      this.queryRoutes().then((routes)=>{

        let i = 0;
        let mergedResultList = [];

        asyncLoop(
          ()=> i >= routes.length,
          (next,end)=>{
            this.readdir(routes[i],{readFiles : true}).catch(reject).then((list)=>{

              const queryFilter = new QueryFilter(this.query);
              list = queryFilter.filter(list);

              list.forEach(item => mergedResultList.push(item));
              i++; next();
            });
          },
          ()=>{

            resolve(mergedResultList);
          }
        );

      })

    });
  }

  write(data,location,filename){
    return new Promise((resolve,reject)=> {
      location = path.join(this.opts.root,location);
      mkdirp(location).then(()=>{
        fs.writeFile(path.join(location,filename) , data ,(err)=>{
          if(err){ return reject(err) } else { return resolve() }
        })
      }).catch(reject);
    })
  }

  post(){
    let route = path.join(this.query.type);
    let filename = this.query.name;
    if(this.query.type === "instance"){
      route = path.join(route,this.query.name);
      filename = this.query.id;
    }
    filename += '.json';
    route = path.join(route,this.query.format);
    return this.write(JSON.stringify(this.query.formattedData),route,filename);
  }

  readFile(location,file){
    return new Promise((resolve,reject)=>{
      let mergedLocation = path.join(this.opts.root,location,file);
      console.log("\nreadFile:",mergedLocation);
      fs.readFile(mergedLocation,'utf-8',(err,data)=>{
        if(this.opts.json) data = stringToJSON(data);
        if(err){
          reject(err);
        }else{
          resolve(data);
        }
      });
    })
  }

  readdir(location,opts){
    return new Promise((resolve,reject)=>{
      let encoding = this.opts.encoding || 'utf-8';
      let mergedLocation = path.join(this.opts.root,location);
      mkdirp(mergedLocation).then(()=>{
        fs.readdir(mergedLocation,encoding,(err,directory)=>{
          if(err){
            reject(err)
          }else if(opts.readFiles){
            let files = [];
            directory = directory.filter(file => !(/^\./.test(file) && !/\.json$/gi.test(file)));
            let i = 0;
            asyncLoop(
              ()=> i >= directory.length,
              (next,end)=>{
                this.readFile(location,directory[i]).then((file)=>{
                  files.push(file);
                  i++;
                  next();
                }).catch((err)=>{
                  end(err);
                })
              },
              (err)=> {
                if(err){
                  reject(err);
                }else{
                  resolve(files);
                }
              }
            )
          }else{
            resolve(directory);
          }
        });
      }).catch(reject);
    })
  }

  unlink(location,filename){
    return new Promise((resolve,reject)=>{
      let mergedLocation = path.join(this.opts.root,location,filename);
      fs.unlink(mergedLocation,(err)=>{
        if(err){
          reject(err);
        }else{
          resolve(null,{message : filename+" removed."});
        }
      })
    });
  }


  remove(){
    return new Promise((resolve,reject)=>{
      this.queryRoutes().then((routes)=>{

        let i = 0;
        let id;
        if(this.query.id){
          id = this.query.id;
        }else if(this.query.name && this.query.name.length > 0){
          id = this.query.name[0];
        }else{
          console.log("Malformed query",this.query);
          reject("Malformed query");
        }


        asyncLoop(
          ()=> i >= routes.length,
          (next,end)=>{
            this.readdir(routes[i],{readFiles : false}).catch(reject).then((directory)=>{
              let filename = false;
              directory.forEach((file)=>{
                let fname = file.replace(/\.json$/i,'');
                if(fname === id){
                  filename = fname +'.json';

                }
              });

              if(filename){
                console.log("DELETE",routes[i],filename);
                this.unlink(routes[i],filename).then(end).catch((err)=>end(err));
              }else{
                i++;next();
              }
            });
          },
          (err,message)=>{
            if(err){
              reject(err)
            }else{
              resolve();
            }
          }
        );
      })
    })
  }
}


module.exports = LocalStorage;
