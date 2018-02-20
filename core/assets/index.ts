import path = require('path');
import parseUrl = require('parseurl');

const assets = (req,res,next)=>{
  const target = parseUrl(req).pathname;
  if(/^\/molecule\-assets/.test(target)){
    const modules_directory = path.join(require.resolve("@molecule-driver/molecule"),'/../../');
    res.sendFile(path.join(modules_directory,target.replace("/molecule-assets","")))
  }else{
    next();
  }
}

const wrapper = (opts ?: object)=>{
  return assets;
}

export = wrapper;
