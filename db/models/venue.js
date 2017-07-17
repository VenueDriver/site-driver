const Sequelize   =  require ("sequelize");
const path        =  require ("path");
const db          =  require(path.join(__dirname ,"../", "sequelize-db"));

module.exports = db.define ("Venue" ,{
  areas: Sequelize.JSON ,
  zip: Sequelize.TEXT ,
  description: Sequelize.TEXT ,
  tables: Sequelize.JSON ,
  time_zone: Sequelize.TEXT ,
  home_URL: Sequelize.TEXT ,
  phone: Sequelize.TEXT ,
  friendly_id: Sequelize.TEXT ,
  time_zone_offset: Sequelize.INTEGER ,
  state: Sequelize.TEXT ,
  title: Sequelize.TEXT ,
  get_friendly_id : Sequelize.TEXT ,
  id: { type : Sequelize.INTEGER , primaryKey : true } ,
  city: Sequelize.TEXT ,
  address: Sequelize.TEXT ,
  reservation_chit_copies_count: Sequelize.INTEGER ,
  country: Sequelize.TEXT
});
