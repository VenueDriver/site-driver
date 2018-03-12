import RouteInjector = require('./index');

const routeMap = new RouteInjector();

console.log("Init")
routeMap.buildFront().then(()=>{
  console.log("ending");
  process.exit(0);
})
