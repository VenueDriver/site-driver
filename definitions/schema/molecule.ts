// MOLECULE MONGOOSE SCHEMA
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

module.exports = new Schema({
  _id   : Schema.Types.ObjectId,
  _value : Schema.Types.Mixed,
  _generator : Schema.Types.Mixed,
  _name : String,
  _label : String,
  _type : String,
  _ngClass : String,
  _format : String,
  _path    : [Number]
});
