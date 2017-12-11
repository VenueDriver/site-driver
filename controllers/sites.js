const fs = require("fs");
const mkdirp = require("mkdirp");
const path = require("path");
const asyncLoop = require("../custom_modules/asyncloop");
const validateComponent = require("../custom_modules/validate-component");
const s3module = require("../custom_modules/amazons3");
const s3 = new s3module();


const writeFile = (data,location,filename,next)=>{
  mkdirp(location , ()=>{
    fs.writeFile(path.join(location,filename) , data ,(err)=>{
      if(err) throw err
      next();
    })
  });
}

const validate = (req)=>{
  return new Promise((resolve,reject)=>{
    getSiteList(false,false,(sites)=>{
      let errors = [];
      if(req.body._isNewSite){
        req.check("_domain", "Domain name already taken by other site.").isNotInList(sites,(el,val)=> {
          return el._domain === val;
        });
      }else{
        req.check("_domain", "Site can not be saved. It does not exist.").isInList(sites,(el,val)=> {
          return el._domain === val;
        });
      }

      req.check("_domain" , "Invalid domain name").isFQDN();

      let recursiveValidator = (obj)=>{
        if(obj._required){
          validateComponent[obj._type](obj,errors);
        }
        let validateChildName = (obj,err)=>{
          let isList = ["List","Slider"].indexOf(obj._type)>-1;
          let listOfNames = [];
          for (let child of obj._child){
            if(!isList){
              if(listOfNames.indexOf(child._name)>-1){
                err.push("More than 1 field using the same name '"+child._name+"'")
              }
              if(child._name.length < 1){
                err.push(child._name + " name is too short.");
              }
              if(child._name.search(/^[a-zA-Z0-9_]+$/)== -1){
                err.push(child._name + " is an invalid name.");
              }
              if(child._name === "string"){
                err.push(child._name + " name should be text");
              }
            }
            listOfNames.push(child._name);
          }
          return err;
        }

        if ( obj.hasOwnProperty("_child") && obj._child.length > 0){
          validateChildName(obj,errors);
          obj._child.forEach((child)=> recursiveValidator(child));
        }
      }

      recursiveValidator(req.body);


      //CHECK DOMAIN DOESN'T EXISTS
      //CHECK HAS A NAME AND IS STRING
      //CHECK EACH CHILD
      (req.validationErrors() ? req.validationErrors() : []).forEach(error=> errors.push(error));
      if(errors.length > 0){
        reject(errors);
      }else{
        resolve(true);
      }
    });
  });
}

const cleanOutput = (data)=>{
  Object.keys(data).forEach( key => {
    if( /^\_/.test(key) ) delete data[key]
  });
  return data;
}

const outputData = (data)=>{
  data = Object.assign({},data);
  if(data.hasOwnProperty("_child")){



    if(["List","Slider"].indexOf(data._type)>-1){




      // IF IS LIST
      if(data._child.length > 0){

        return data._child.map( (el)=>outputData(el) );
      }else{

        return [];
      }



    }else{


      // IF IS GROUP
      if(data._child.length > 0){
        data._child.forEach((el,i)=>{
          data[el._name.replace(/\s/,"-")] = outputData(el);
        });
      }

    }

  }


  if(data._value){
    return data._value;
  }

  return cleanOutput(data);

}



const save = (req,res,next)=>{
  let filename = req.body._domain;
  validate(req).then((valid)=>{
    console.log("site valid",req.validationErrors());
    if(valid){
      if(req.body._isNewSite) delete req.body._isNewSite;
      // writeFile(JSON.stringify(req.body),"./sites-data/","_"+filename+".json",()=>{
        let readableDate = JSON.stringify(outputData(req.body));
      //   writeFile( readableDate ,"./sites-data/",filename+".json",()=>{
          s3.upload(
            readableDate,
            "/config",filename+".json",
            ()=>{

            s3.upload(
              'retrieveJSONP({ref:\"config/jsonp_'+filename+'.json\",data:'+readableDate+'})',
              "/config","jsonp_"+filename+".json",
              ()=>{
                s3.upload(
                  JSON.stringify(req.body),
                  "/config","_"+filename+".json",
                  ()=>{

                  res.json({"body" : outputData(req.body) });

                }, s3.dataBucket.fs )
            }, s3.dataBucket.fs )
          }, s3.dataBucket.fs )
      //   });
      // });
    }else{
      res.json({"message": "Invalid Data"});
    }
  },(errors)=>{
    console.log("site invalid",errors );
    res.json({"error" : errors});
  })

}

const checkUser = (req,res,next)=>{
//   if(req.isAuthenticated()){
// 		return next(true);
// 	} else {
// 		return next(false);
// 	}
return next(true);
}

const getSiteList = (req,res,next = false)=>{
  const useLocal = false;
  let fileSystem = s3.dataBucket.fs;
  let filesLocation = "/config/";
  if(useLocal){
    console.log("Using local");
    fileSystem = fs;
    filesLocation = "./sites-data/";
  }
  fileSystem.readdir( filesLocation , (err, fileList)=>{
    fileList = fileList.filter((name) => /^\_/.test(name) && /\.json$/.test(name));
    let files = [] , i = 0;
    if(err) throw err
    asyncLoop(
      () => i >= fileList.length,
      (next)=>{
        fileSystem.readFile(filesLocation+fileList[i], "utf-8" , (err, data) => {
          if (err) throw err;
          data = JSON.parse(data);
          files.push(data);
          i++;
          next();
        });
      },
      ()=>{
        if(next === false){
          res.json(files);
        }else{
          next(files);
        }
      }
    )
  })
}


module.exports.save = save;
module.exports.checkUser = checkUser;
module.exports.getSiteList = getSiteList;
