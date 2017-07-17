const path = require("path");

let heroku = [];
if(process.env.DATABASE_URL){
  heroku = process.env.DATABASE_URL.match(/postgres:\/\/([^:]+):([^@]+)@([^:]+):(\d+)\/(.+)/);
}

module.exports ={
  rawHEROKU : process.env.DATABASE_URL,
  dbname: heroku[5] || "cms",
  username: heroku[1] || "cms",
  password: heroku[2] || "",
  options:{
    host: heroku[3] || "127.0.0.1",
    port: heroku[4] || "5432",
    dialect: "postgres",
    logging : false
  }
}
