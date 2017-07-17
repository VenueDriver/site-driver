const getJSON     = require("./rest");

const pdParse = (raw)=>{
  let response = raw.replace(/^retrieveJSONP\(\{ref\:\"([a-zA-Z0-9/])*\w+\.json\"\,data\:/,'');
  return JSON.parse(response.substring(0,response.length-2));
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
