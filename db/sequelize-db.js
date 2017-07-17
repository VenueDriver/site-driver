const Sequelize         = require ("sequelize");
const path              = require ("path");
const config            = require (path.join(__dirname ,"../config", "settings"));

module.exports          = new Sequelize(config.db.dbname , config.db.username , config.db.password , config.db.options);
