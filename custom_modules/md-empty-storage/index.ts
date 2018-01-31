class EmptyStorage{

  constructor(opts){
    this.opts = {};
    Object.keys(opts).forEach((key)=>{
      this.opts[key] = opts[key];
    });
    this.query = Object.assign({},opts.query);
  }

  get(){
    return new Promise((resolve,reject)=>{
      resolve([]);
    });
  }

  post(){
    return new Promise((resolve,reject)=>{
      resolve(null)
    })
  }

  remove(){
    return new Promise((resolve,reject)=>{
      resolve(null);
    })
  }

}

module.exports = EmptyStorage;
