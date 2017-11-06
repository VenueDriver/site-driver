const getJSON     = require("./rest");
const retrieveJSONP = (data)=> data;

const pdParse = (raw)=>{
  return eval(raw).data;
}

const pdGet = (location,next)=>{
  console.log('/data.portaldriver.com/'+location);
  getJSON({
    hostname: 's3.amazonaws.com',
    port: 443,
    path: '/data.portaldriver.com/'+location,
    headers : {}
  }, (code,response,raw)=>{
    if(code === 200){
      next(pdParse(raw));
    }else{
      next({"error": raw})
    }

  });
}

module.exports.parse = pdParse;
module.exports.get = pdGet;
