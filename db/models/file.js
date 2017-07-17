const Sequelize   =  require("sequelize");
const path        =  require("path");
const db          =  require(path.join(__dirname ,"../", "sequelize-db"));

const File = db.define("file",{
   id: {type : Sequelize.TEXT , primaryKey : true},
   download_link:Sequelize.TEXT,
   filename:Sequelize.TEXT,
   format:Sequelize.TEXT,
   size:Sequelize.INTEGER,
   created:Sequelize.DATE,
   thumbnailId:Sequelize.TEXT,
   title:Sequelize.TEXT,
   uploadedBy:Sequelize.TEXT,
   aspectRatio:Sequelize.FLOAT,
   widthPixels:Sequelize.INTEGER,
   heightPixels:Sequelize.INTEGER,
   tags: Sequelize.ARRAY(Sequelize.TEXT),
   data:Sequelize.JSON
  })


module.exports = File
