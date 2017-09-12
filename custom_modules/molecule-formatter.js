class MoleculeFormatter{

  constructor(opts){
    this._data = Object.assign({},opts.data);
  }

  readable(){
    return new Promise((resolve,reject)=>{
      let data = Object.assign({},this._data);
      let formatFunctions = [ this.matchNameAndValue, this.removeSystemKeys ];
      data = this.deepLoop(data,formatFunctions);
      data = this.formatRoot(data);
      resolve(data);
    });
  }

  formatRoot(data){
    data.id = this._data["_id"];
    data.created_at = this._data["_created_at"];
    data.updated_at = this._data["_updated_at"];
    Object.keys(data[this._data._name]).forEach(valueKey =>{
      data[valueKey] = data[this._data._name][valueKey];
    });
    delete data[this._data._name];
    return data;
  }

  deepLoop(data,formatFunctions){
    if( data.hasOwnProperty('_value') ){
      if(Array.isArray(data._value)){
        data._value.forEach((value,i)=>{
          data._value[i] = this.deepLoop(value,formatFunctions);
        })
        if(data.hasOwnProperty("_options")){
          if(data._options._convert_array_to_keys === true){
            // console.log("Data:",data);
            data._value = this.arrayToKeys(data._value);
            // console.log("Array to keys result data",data);
          }
        }
      }
    }
    formatFunctions.forEach((format)=>{
      data = format(data);
    });
    return data;
  }

  matchNameAndValue(data){
    let tmp = {};
    tmp[data._name.replace(/\s/gi,'_')] = data._value;
    return tmp;
  }

  removeSystemKeys(data){
    Object.keys(data).forEach( key =>{
      if( /^\_/.test(key) ) delete data[key]
    });
    return data;
  }

  arrayToKeys(array){
    let obj = {};
    array.forEach((item,i)=>{
      let keys = Object.keys(item);
      if(keys.length>1) console.log("ERROR: More than one key name existing in [object]. Information could be lost in the formatting process.",keys);
      let key = keys[0];
      obj[key] = item[key];
    });
    return obj;
  }

}

module.exports = MoleculeFormatter;
