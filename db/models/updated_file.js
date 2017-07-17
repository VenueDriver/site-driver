const Sequelize   =  require("sequelize");
const path        =  require("path");
const db          =  require(path.join(__dirname ,"../", "sequelize-db"));

const UpdatedFile = db.define("updated_file",{
   file_id:Sequelize.TEXT,
   download_link:Sequelize.TEXT,
   action:Sequelize.TEXT,
   format:Sequelize.TEXT,
   filename:Sequelize.TEXT,
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
});


module.exports = UpdatedFile;
