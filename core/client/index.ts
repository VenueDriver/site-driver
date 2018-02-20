import path = require('path');

const client = {
  app : (req,res)=>{
    const location = require.resolve('@molecule-driver/molecule');
    res.sendFile(path.join(location,'/../../','/client/front','index.html'));
  }
};

export = client;
