const db            = require("./sequelize-db");
const smartImage    = require("../custom_modules/smartimage");
const download      = require("../custom_modules/downloadfile");
const asyncLoop     = require("../custom_modules/asyncloop");
const colors        = require("colors");
const path          = require ("path");
const Artist          = require ("./models/artist");
const Venue          = require ("./models/venue");
const Event          = require ("./models/event");
const File          = require ("./models/file");
const UpdatedFile   = require ("./models/updated_file");

module.exports = function(){

  this.createOrUpdate = (model,item,next)=>{
    model.findOne({where : {id: item.id}}).then((match)=>{
      if(match){
        match.update(item).then(next);
      }else{
        model.create(item).then(next);
      }
    });
  }

  // ==================================
  // VENUE DRIVER
  // ==================================

  this.vd = {
    artist : (query,next) => { Artist.findOne({ where : query }).then((el)=>{
      if(!el.hasOwnProperty("dataType")){ el.dataValues.dataType = "artist";}
      next(el);
    }) },
    artists : (next) => { Artist.findAll().then(next) },
    venue : (query,next) => { Venue.findOne({ where : query }).then((el)=>{
      if(!el.hasOwnProperty("dataType")){ el.dataValues.dataType = "venue";}
      next(el);
    }) },
    venues : (next) => { Venue.findAll().then(next) },
    event : (query,next) => { Event.findOne({ where : query }).then((el)=>{
      if(!el.hasOwnProperty("dataType")){ el.dataValues.dataType = "event";}
      next(el);
    }) },
    events : (next) => { Event.findAll().then(next) }
  }

  this.updateVD = (artists,venues,events,forced = false,end)=>{
    Artist.sync({forced : forced}).then(()=>{
      Venue.sync({forced : forced}).then(()=>{
        Event.sync({forced : forced}).then(()=>{
          let a=0,v=0,e=0;
          asyncLoop(
            ()=> a >= artists.length,
            (next,end)=>{
              this.createOrUpdate(Artist,artists[a],()=>{
                a++;
                next();
              });
            },
            ()=>{
              asyncLoop(
                ()=> v >= venues.length,
                (next,end)=>{
                  this.createOrUpdate(Venue,venues[v],()=>{
                    v++;
                    next();
                  });
                },
                ()=>{
                  asyncLoop(
                    ()=> e >= events.length,
                    (next,end)=>{
                      this.createOrUpdate(Event,events[e],()=>{
                        e++;
                        next();
                      });
                    },
                    end
                  );
                }
              );
            }
          );
        })
      })
    });
  }


  // ==================================
  // SMARTIMAGE
  // ==================================

  this.addFileForUpdate = (file,action,next)=>{
    let update_record = Object.assign({},file);
    update_record.data = file;
    update_record.file_id = file.id;
    update_record.action = action;
    update_record.download_link = file.links[2].downloads.href;
    UpdatedFile.findOne({where : {file_id: update_record.file_id}}).then((file_queue)=>{
      if(update_record.hasOwnProperty("id")) delete update_record["id"];
      if(file_queue){
        file_queue.update(update_record).then(next);
      }else{
        UpdatedFile.create(update_record).then(next);
      }
    });
  }

  this.populateDB = (forced,next)=>{
    let existingFiles = [];
    smartImage.getAllFiles((err,files)=>{
      if(err){
        console.error(err.red);
        next(err);
      }else{
        console.log("\nStoring data into database...".gray);
        db.sync().then(()=>{
          UpdatedFile.sync({ force : forced }).then(()=>{
            File.sync( { force : forced } ).then(()=>{
              // UPDATE DATABASE WITH SMART IMAGE DATA
              let i = 0;
              asyncLoop(
                //CONDITION
                ()=> i >= files.data.length,

                //WORK
                (next)=>{
                  const file = files.data[i];
                  i +=1;
                  if(file.tags.indexOf("flyer")> -1){
                    file.download_link = file.links[2].downloads.href;
                    existingFiles.push(file.id);
                    File.findOne({ where : {id : file.id} }).then((result)=>{
                      file.data = Object.assign({},file);
                      if(result){
                        if(result.dataValues.data.links[2].downloads.href != file.data.links[2].downloads.href){
                          this.addFileForUpdate(file,"update",next);
                        }else{
                          let flaggedForUpdate = false;
                          result.dataValues.data.tags.forEach((tag)=>{
                            if(file.tags.indexOf(tag)<0){flaggedForUpdate = true}
                          });
                          if(flaggedForUpdate){
                            this.addFileForUpdate(file,"update",next);
                          }else{
                            result.update(file).then(next);
                          }
                        }
                      }else{
                        this.addFileForUpdate(file,"create",next);
                      }
                    })


                  }else{
                    next();
                  }
                },
                ()=>{
                  File.destroy({where : { id : { $not : existingFiles } } })
                    .then((deletedCount)=>{
                      console.log(`${deletedCount} Record(s) deleted.`.red);
                      next(null);
                    });
                }
              ); // <--- ASYNC LOOP END
            }) // <--- FILE SYNC END
          }) // <--- UPDATE SYNC END
        })
      }
    });
  }

  this.getFiles = (query,next)=>{
    File.sync().then(()=>{
      File.findAll(query).then(next);
    });
  }


  this.getAllFilesByFormat = (formats,next)=>{
    formats = formats.map((item)=>{
      item = item.replace(/\./,"").toUpperCase();
      return item = (/jpg/gi.test(item)) ? "JPEG" : item;
    });
    File.sync().then(()=>{
      File.findAll({
        where :{
          format : {
            $in : formats
          }
        }
      }).then(next);
    });
  }

  this.checkForUpdates = (action,query,next)=>{
    if(typeof query === "function"){
      next = query;
      query = {where : {}};
    }
    query.where = (query.hasOwnProperty("where")) ? query.where : {};
    if(action){
      query.where.action = { $in : action };
    }
    UpdatedFile.findAll(query).then(next);
  }

}
