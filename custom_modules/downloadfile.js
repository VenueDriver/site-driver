const fs        = require('fs');
const path      = require('path');
const mkdirp    = require('mkdirp');
const colors    = require('colors');
const timeTrack = require('./timetrack');
const request   = require('request');

module.exports = (fileLocation,saveLocation,fileName,next)=>{
  fileLocation = fileLocation.replace(/\{size\}/gi,"o");
  const ttrack = new timeTrack();
  ttrack.start();
  // console.log("From:",fileLocation.magenta);
  // console.log("Saving as:",path.join(saveLocation,fileName).magenta)
  mkdirp(saveLocation, (err)=>{
      if (err){ console.error("= ".red,err.red) }
      else{
        request(fileLocation, {encoding: 'binary'}, function(error, response, body) {
          fs.writeFile(path.join(saveLocation,fileName), body, 'binary', function (err) {
            ttrack.stop();
            console.log("File download completed".green, ttrack.secs().toFixed(2).gray,"(secs)".gray);
            next();
          });

        });
      }
  });
}
