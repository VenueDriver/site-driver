import cp = require("child_process");
import path = require("path");

cp.exec('ls', { cwd : path.join(__dirname,'/../')} ,(error, stdout, stderr) =>{
  console.log(stdout);
  process.exit(0);
});



// import RouteInjector = require('./index');
//
// const routeMap = new RouteInjector();
//
// console.log("Init")
// routeMap.buildFront().then(()=>{
//   console.log("ending");
//   process.exit(0);
// })
