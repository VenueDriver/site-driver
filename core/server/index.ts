const server = {
  get : (query)=>{
    return new Promise((resolve,reject)=>{
      resolve({"message" : "ok"});
    });
  },
  post : (query)=>{
    return new Promise((resolve,reject)=>{
      resolve({"message" : "ok"});
    });
  },
  delete : (query)=>{
    return new Promise((resolve,reject)=>{
      resolve({"message" : "ok"});
    });
  }
};

export = server;
