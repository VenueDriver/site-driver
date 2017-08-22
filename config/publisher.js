module.exports ={
  formats : {
    // SET UP OUTPUT DATA FORMATS
    "original" : (data)=>{
      return new Promise((resolve,reject)=>{
        resolve(data);
      })
    },
    "json" : (data)=>{
      return new Promise((resolve,reject)=>{
        // let formattedData = cleanFormatter(formattedData);
        resolve(data);
      })
    },
    "jsonp" : (data)=>{
      return new Promise((resolve,reject)=>{
        // let formattedData = cleanFormatter(formattedData);
        // formattedData = 'retrieveJSONP({ref:\"jsonp/'+filename+'\",data:'+formattedData+'})';
        resolve(data);
      })
    },
  }
}
