const path = require("path");

class Publisher{

  constructor(opts){
    this.data = Object.assign({},opts.data);
    this.basename = opts.basename;
    this.storageAdapter = opts.storageAdapter;
    this.type = opts.type;
  }

  publishOriginal(){
    return new Promise((resolve,reject)=>{
      let formattedData = Object.assign({},this.data);
      formattedData = JSON.stringify(formattedData);
      this.storageAdapter.input(this.type,formattedData,"/original",this.basename).then(resolve).catch(reject);
    })
  }

  publishJSON(){
    console.log("Publishing json");
    return new Promise((resolve,reject)=>{
      let formattedData = Object.assign({},this.data);
      // formattedData = cleanFormatter(formattedData);
      formattedData = JSON.stringify(formattedData);
      this.storageAdapter.input(this.type,formattedData,"",this.basename).then(resolve).catch(reject);
    })
  }

  publishJSONP(){
    return new Promise((resolve,reject)=>{
      let formattedData = Object.assign({},this.data);
      // formattedData = cleanFormatter(formattedData);
      // formattedData = 'retrieveJSONP({ref:\"jsonp/'+filename+'\",data:'+formattedData+'})';
      formattedData = JSON.stringify(formattedData);
      this.storageAdapter.input(this.type,formattedData,"/jsonp",this.basename).then(resolve).catch(reject);
    })
  }

  cleanFormatter(data){

    const cleanOutput = (data)=>{
      Object.keys(data).forEach( key => {
        if( /^\_/.test(key) ) delete data[key]
      });
      return data;
    }

    const outputData = (data)=>{
      data = Object.assign({},data);
      if(data.hasOwnProperty("_child")){


        if(["List","Slider"].indexOf(data._type)>-1){


          // IF IS LIST
          if(data._child.length > 0){

            return data._child.map( (el)=>outputData(el) );
          }else{

            return [];
          }

        }else{


          // IF IS GROUP
          if(data._child.length > 0){
            data._child.forEach((el,i)=>{
              data[el._name.replace(/\s/,"-")] = outputData(el);
            });
          }

        }

      }


      if(data._value){
        return data._value;
      }

      return cleanOutput(data);

    }

  }

}


module.exports = Publisher;
