const path = require("path");
const fs = require("fs");
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
    this.opts.baseDirectory = '';
    this.opts.json = true;
    Object.keys(opts).forEach((key)=>{
      this.opts[key] = opts[key];
    });
  }

  write(data,location,filename){
    return new Promise((resolve,reject)=> {
      location = path.join(this.opts.baseDirectory,location);
      mkdirp(location).then(()=>{
        fs.writeFile(path.join(location,filename) , data ,(err)=>{
          if(err){ return reject(err) } else { return resolve() }
        })
      }).catch(reject);
    })
  }

  readFile(location,file){
    return new Promise((resolve,reject)=>{
      let mergedLocation = path.join(this.opts.baseDirectory,location,file);
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
      let encoding = opts.encoding || 'utf-8';
      let mergedLocation = path.join(this.opts.baseDirectory,location);
      mkdirp(mergedLocation).then(()=>{
        fs.readdir(mergedLocation,encoding,(err,directory)=>{
          if(err){
            reject(err)
          }else if(opts.readFiles){
            let files = [];
            directory = directory.filter(file => !(/^\./.test(file)));
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
      let mergedLocation = path.join(this.opts.baseDirectory,location,filename);
      fs.unlink(mergedLocation,(err)=>{
        if(err){
          reject(err);
        }else{
          resolve(null,{message : filename+" removed."});
        }
      })
    });
  }


  remove(id,location){
    return new Promise((resolve,reject)=>{
      let mergedLocation = path.join(this.opts.baseDirectory,location);
      fs.readdir(mergedLocation,'utf-8',(err,directory)=>{
        directory = directory.filter(file => !(/^\./.test(file) || !(/\.\w+$/gi.test(file))));
        let i = 0;
        asyncLoop(
          ()=> i >= directory.length,
          (next,end)=>{
            this.readFile(location,directory[i]).then((file)=>{
              if(file._id == id){
                this.unlink(location,directory[i]).then(end).catch((err)=>end(err));
              }else{
                i++;
                next();
              }
            }).catch((err)=>{
              end(err);
            })
          },
          (err)=> {
            if(err){
              reject(err);
            }else{
              resolve({message: id+" removed."});
            }
          }
        )
      });
    })
  }


}


module.exports = LocalStorage;
