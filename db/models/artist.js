const Sequelize   =  require ("sequelize");
const path        =  require ("path");
const db          =  require(path.join(__dirname ,"../", "sequelize-db"));

module.exports = db.define( "Artist" , {
  friendly_id : Sequelize.TEXT,
  id          : { type : Sequelize.INTEGER , primaryKey : true },
  name        : Sequelize.TEXT
});
