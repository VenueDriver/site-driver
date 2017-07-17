const config ={
  db : require("./db_postgresql"),
  port : process.env.PORT || 3001
}

// = EXPOSE IT
module.exports = config;
