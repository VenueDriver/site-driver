const settings = require('../config/publisher');
const asyncLoop = require('../custom_modules/asyncloop');
const StorageRoutes = require('../config/storage');

class Publisher{

  constructor(query){
    this.query = Object.assign({},query);
  }

  publish(format,data){
    return new Promise((resolve,reject)=>{
      data = Object.assign({},data); // PRESERVE ORIGINAL DATA
      if(!settings.formats.hasOwnProperty(format)){
        reject("No format '"+format+"'.Please provide format function on config/publisher.js");
      }else{
        settings.formats[format](data).then((formatted)=>{
          this.query.formattedData = formatted;
          this.query.format = format;
          this.getStorage().save().then(resolve).catch(reject);
        }).catch(reject);
      }
    })
  }

  unpublish(format){
    this.query.format = format;
    return this.getStorage().remove();
  }

  get(format){
    console.log("Publisher get");
    this.query.format = format;
    return this.getStorage().get();
  }

  getStorage(){
    return new StorageRoutes(this.query);
  }

  publishAll(){
    return new Promise((resolve,reject)=>{
      let i = 0;
      let formats = Object.keys(settings.formats);
      asyncLoop(
        ()=> i >= formats.length,
        (next,end)=>{
          this.publish(formats[i],this.query.data).then(()=>{ i++ ; next() })
          .catch((err)=> end(err) );
        },
        (err)=>{
          if(err){
            reject(err)
          }else{
            resolve();
          }
        }
      );
    })
  }

  unpublishAll(){
    return new Promise((resolve,reject)=>{
      let i = 0;
      let formats = Object.keys(settings.formats);
      asyncLoop(
        ()=> i >= formats.length,
        (next,end)=>{
          this.unpublish(formats[i]).then(()=>{ i++ ; next() })
          .catch((err)=> end(err) );
        },
        (err)=>{
          if(err){
            reject(err)
          }else{
            resolve();
          }
        }
      );
    })
  }


  // cleanFormatter(data){
  //
  //   const cleanOutput = (data)=>{
  //     Object.keys(data).forEach( key => {
  //       if( /^\_/.test(key) ) delete data[key]
  //     });
  //     return data;
  //   }
  //
  //   const outputData = (data)=>{
  //     data = Object.assign({},data);
  //     if(data.hasOwnProperty("_child")){
  //
  //
  //       if(["List","Slider"].indexOf(data._type)>-1){
  //
  //
  //         // IF IS LIST
  //         if(data._child.length > 0){
  //
  //           return data._child.map( (el)=>outputData(el) );
  //         }else{
  //
  //           return [];
  //         }
  //
  //       }else{
  //
  //
  //         // IF IS GROUP
  //         if(data._child.length > 0){
  //           data._child.forEach((el,i)=>{
  //             data[el._name.replace(/\s/,"-")] = outputData(el);
  //           });
  //         }
  //
  //       }
  //
  //     }
  //
  //
  //     if(data._value){
  //       return data._value;
  //     }
  //
  //     return cleanOutput(data);
  //
  //   }
  //
  // }

}


module.exports = Publisher;
