const MoleculeFormatter = require("../custom_modules/molecule-formatter");

module.exports ={
  formats : {
    // SET UP OUTPUT DATA FORMATS
    "original" : (data)=>{
      return new Promise((resolve,reject)=>{
        resolve(data);
      })
    },
    "readable" : (data)=>{
      const formatter = new MoleculeFormatter({data:data});
      return formatter.readable();
    }
  }
}
