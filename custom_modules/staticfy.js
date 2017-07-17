// = INIT
const fs        = require ('fs');
const colors    = require('colors');
const s3module = require("../custom_modules/amazons3");
const pdStatic = require('../custom_modules/pd.jsonp');
const path = require("path");
const app = require("../server")._app;
const s3 = new s3module();

const parseHTML = (domain,page,layout,next)=>{
  let fileSystem = s3.dataBucket.fs;
  let filesLocation = "/config/";
  fileSystem.readFile(path.join(filesLocation,domain+".json"),"utf-8",(err,data)=>{
    let locals;
    try{
      locals = JSON.parse(data);
    }catch(e){
      console.log(e);
    }
    if(locals){
      pdStatic.get("venue/"+locals.venue_info.general_info.venue.id+"/events.json",(events)=>{
        let i = 0;
        let fillUpcomingEvents = (obj)=>{
            if(Array.isArray(obj)){
              return obj.map(el=>fillUpcomingEvents(el));
            }else if(typeof obj == "object" && obj){
              Object.keys(obj).forEach(key=>{
                if(key === "use_item_type" && obj[key].indexOf('Upcoming') > -1){
                  let item = events[i];
                  obj.use_information_from = (i >= events.length-1) ? events[events.length-1] : events[i];
                  obj.tmp = {
                    media : "//flyerdriver.com/flyer/squared/320/"+item.dataType+"/"+item.id+".png",
                    title : item.title,
                    additional_text : item.short_description || "",
                    buttons : [
                      {label : "BUY TICKETS", url : "//ticketdriver.com/"+item.get_friendly_id+"/buy/tickets/event/"+item.id},
                      {label : "RESERVE VIP", url : "//ticketdriver.com/"+item.get_friendly_id+"/apps/web/reservation?event="+item.id }
                    ]
                  }
                  i++;
                }else{
                  obj[key] = fillUpcomingEvents(obj[key]);
                }
              });
            }
            return obj;
        }

        locals = fillUpcomingEvents(locals);
        locals._domain = domain;
        locals._page = page;
        app.render('./demo-site/'+page, locals , (err,html)=>{
          console.log(typeof html);
          next(err,html);
        });
      })
    }else{
      console.log("Error parsing data".red);
    }
  });
};

module.exports.parseHTML = parseHTML;
