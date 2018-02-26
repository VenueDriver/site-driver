import path = require('path');

const client = {
  app : (req,res)=>{
    const location = require.resolve('@molecule-driver/molecule');
    res.sendFile(path.join(location,'/../../','/client/public/js','index.html'));
  }
};

export = client;
