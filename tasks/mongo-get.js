const mongo       = require('mongodb');
const mongoose    = require('mongoose');
const MoleculeModel = require('../definitions/schemas/molecule');
const asyncLoop = require('../custom_modules/asyncLoop');
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/loginapp',{ useMongoClient: true });
const db          = mongoose.connection;


MoleculeModel.find().exec((err, mongoResult)=>{
  console.log("Result count",mongoResult.length);
  mongoResult.forEach(el => console.log(`${el._type} | ${el._name} | ${el._id}`));
  process.exit(0);
});
