// MOLECULE MONGOOSE SCHEMA
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

module.exports = mongoose.model('Molecule',
  new Schema({
    _mongoid   : Schema.Types.ObjectId,
    _id : String,
    _value : Buffer,
    _name : String,
    _type : String,
    _format : String
  })
);
