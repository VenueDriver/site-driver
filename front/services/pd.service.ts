import { Injectable , Input, Output } from '@angular/core';
import { dateSetOffset , asyncLoop , each , merge } from '../helpers/utils';
import { postProcessData } from '../config/post-process-data';
import { Config } from '../services/config.service';
import { WindowRef } from '../helpers/window-ref';
import 'rxjs/add/operator/toPromise';
import { Observable } from 'rxjs/Observable';

@Injectable()

export class PdService{

  private requests : any;
  private _state : Array<string> = ["initializing"];
  requesting : boolean;
  dataConfig : any;
  public index : any;
  _originalConfig : any;
  repeater : any;
  state : any;
  config : any = { data : {} };

  constructor( private WindowRef : WindowRef , private siteConfig : Config){


    this.WindowRef.nativeWindow.portaldriver = this.WindowRef.nativeWindow.portaldriver || {};

    this.config.data = this.siteConfig.get().data;

    this.requests = [];
    this.requesting = false;
    this.dataConfig = {
      venues  : [],
      artists : [],
      events  : [],
      dates   : {},
      limit   : {}
    };


    /*
    # ====================================
    # - RETRIEVE JSON-P
    # Get JSON from response.
    # ====================================
    */

    this.repeater = (json)=>{return ( json )};

    this.WindowRef.nativeWindow.retrieveJSONP = (json:any[])=>{
      this._successJSONP(json)
      this.repeater(json)
    }

    /*
    # ====================================
    # - INDEX
    # ====================================
    */

    this.index ={
      artist  : {},
      venue   : {},
      event   : {},
      artists : [],
      venues  : [],
      events  : []
    }


    /*
    # ====================================
    # - CONFIGURATION
    # ====================================
    */

    this._originalConfig = Object.assign({},this.config.data);

    for(let key of Object.keys(this.config.data)){
      this.dataConfig[key] = this.config.data[key]
    }

    this.state = function(name : string ,active : any = null) : boolean{
      let state = false;
      if(active === null){
        if(this._state.indexOf(name)>-1){
          state = true;
        }
      }else{
        if(this._state.indexOf(name)>-1 && !active){
          this._state.splice(this._state.indexOf(name),1);
        }else if(this._state.indexOf(name)<0 && active){
          this._state.push(name);
          state =  true;
        }
      }
      return state;
    }

    this.state("initializing",false);

  }

  /*
  # ====================================
  # - EVENTS ARRAY
  # Get the complete list of events
  # ====================================
  */

  eventsArray(){
    let newArray = [];
    Object.keys(this.index.event).forEach(key => newArray.push(this.index.event[key]));
    return newArray;
  }



  /*
  # ====================================
  # - ADD
  # Add data to the index.
  # ====================================
  */

  add(file : any){
    // GET SOME INFORMATION
    const req = this.requests["/"+file.ref];
    const requestType = req.target;
    //ADD TO THE RAW INDEX
    file.data.forEach( item => this.index[item.dataType][item.id] = item );

    //CREATE AN ARRAY FROM THE RAW INDEX
    let hashToArray : any[] = [];
    each(this.index[file.data[0].dataType] , item => hashToArray.push(item));
    this.index[file.data[0].dataType+"s"] = hashToArray;

    //IF IT'S AN EVENTS REQUEST ORDER AND FILTER
    //THEN RETURN THE DATA VIA CALLBACK
    if(requestType === "event"){
      this.queryEvents(this.dataConfig)
    }

    if(req.id > -1){
      req.callback = req.callback.filter((el) =>{
        el(this.index[req.target][req.id]);
        return false;
      });
    }else{
      req.callback = req.callback.filter((el) =>{
        el(this.index[req.target]);
        return false;
      });
    }

  }

  addNode(req : any){
    let node = document.createElement('script');
    node.src = (this.config.baseURL || "https://s3.amazonaws.com/data.portaldriver.com") + req.path;
    document.getElementsByTagName("head")[0].appendChild(node);
  }





  /*
  # ====================================
  # - LOAD JSON-P
  # Load data from pre-generated JSON-P files.
  # ====================================
  */

  _successJSONP(file:any){
    if(typeof this.config.afterRequest === 'function'){this.config.afterRequest()}
    this.add(file);
  }


  _loadJSONP(target:string, id:number, path:string, next){
    if(!this.requests.hasOwnProperty(path)) this.requests[path] = { target , id , path };
    if(!this.requests[path].hasOwnProperty("callback")) this.requests[path].callback = [];
    this.requests[path].callback.push(next);
    this.addNode(this.requests[path]);
  }



  /*
  # ====================================
  # - CHECK IF AN ITEM EXISTS
  # ====================================
  */

  exists ={
    findOne : (t:string, id:number) => this.index[t].hasOwnProperty(id),
    artist  : (id:number)   => this.exists.findOne("artist" ,id),
    venue   : (id:number)   => this.exists.findOne("venue"  ,id),
    event   : (id:number)   => this.exists.findOne("event"  ,id)
  }




  /*
  # ====================================
  # - FETCH ONE
  # Fetch an individual:
  # Artist / Venue / Event
  # ====================================
  */

  fetchOne(target:string, id:number, next : any){
    if(this.exists[target](id)){
      next(this.index[target][id])
    }else{
      this.state("loading "+target,true);
      this._loadJSONP(target,id,`/${target}/${id}.json`,(result)=>{
        this.state("loading "+target,false);
        next(result);
      })
    }
    return this;
  }



  artist(id:number){
    return new Promise(
      (resolve,reject)=> this.fetchOne("artist" , id , resolve)
    );
  }
  venue(id:number, next){
    return new Promise(
      (resolve,reject)=> this.fetchOne("venue" , id , resolve)
    );
  }
  event(id:number){
    return new Promise(
      (resolve,reject)=> this.fetchOne("event" , id , resolve)
    );
  }

  /*
  # ====================================
  # - GET
  # ====================================
  */

  get(target:string, next){
    this._loadJSONP(target,-1,`/${target}.json`,next)
  }




  /*
  # ====================================
  # - FILTER AND ORDER
  # ====================================
  */

  queryEvents(criteria:any , fromCache : boolean = false, events :any[] = this.eventsArray()){
    return new Promise((resolve,reject)=>{
      //COPY ARRAY FILTERING THE EVENTS
      let copy = events.filter((ev)=>{
        if(!ev.active && !ev.show_in_calendars){ return false  }
        if(criteria.events.length  > 0){
          if(!(criteria.events.indexOf(ev.id) > -1)) { return false  }
        }
        if(criteria.artists.length > 0){
          if(!(criteria.artists.indexOf(ev.headliner) > -1)){ return false }
        }
        if(criteria.venues.length   > 0){
          if(!(criteria.venues.indexOf(ev.venue_id) > -1)){ return false }
        }
        if(criteria.dates.hasOwnProperty("daysOfTheWeek")){
          if(!(criteria.dates.daysOfTheWeek.indexOf((new Date(ev.date)).getDay()) > -1)){ return false }
        }
        if(criteria.dates.hasOwnProperty("from")){
          if(!(dateSetOffset( new Date(criteria.dates.from) ,-32  ).getTime() <= dateSetOffset(new Date(ev.date) , -8).getTime() )){ return false }
        }
        if(criteria.dates.hasOwnProperty("to")){
          if(!(dateSetOffset(new Date(criteria.dates.to) ,  -32  ).getTime() >= dateSetOffset(new Date(ev.date) , -8).getTime() )){ return false  }
        }
        return true
      })



      if(!fromCache){
        // POST PROCESS
        copy  = copy.map( ev => {
          ev.date = dateSetOffset(new Date(ev.date) , 0);
          if(ev.flyer_url.indexOf("default")>-1){
            if(this.config.data.hasOwnProperty("defaultFlyerURL")){
              ev.flyer_url = this.config.data.defaultFlyerURL;
            }
          }

          //CREATE DEEP MERGE
          if(this.config.data.hasOwnProperty("extend_data")){
            if(this.config.data.extend_data.hasOwnProperty(ev.id)){
              ev = merge(ev,this.config.data.extend_data[ev.id],{usedeep : true, usenull : false, newobj : true});
            }
          }
          return ev;
        });
      }



      postProcessData(copy,fromCache).then( (copy) =>{

        // APPLY ORDER
        criteria.orderBy.forEach(order => {
          switch(order.field){
            case "date" :
              copy.sort((a,b)=>{
                let adate = (new Date(a.date)).getTime();
                let bdate = (new Date(b.date)).getTime();
                if(order.desc){
                  return bdate - adate
                }else{
                  return adate - bdate
                }
              })
            break
          }

        });

        this.index.events = copy;
        this.state("loading events",false);
        resolve(this.index);
      });

    });
  }


  filterByID(filter:number[] , list:any[], callback){
    if(filter.length > 0){
      callback(list.filter( item => filter.indexOf(item.id) > -1))
    }else{
      callback(list)
    }
  }

  /*
  # ====================================
  # - ARTISTS
  # Shorthand for get("artists")
  # ====================================
  */

  artists(filter : any = {artists : []}){
    this.state("loading artists",true);
    return new Promise((resolve,reject)=>{
      if(this.index.artists.length > 0){
        this.state("loading artists",false);
        this.filterByID(filter , this.index.artists , resolve)
      }else{
        this.get("artists" , list => this.filterByID(filter , list , (list)=> {
          this.state("loading artists",false);
          resolve(list);
        }))
      }
    });
  }


  /*
  # ====================================
  # - VENUES
  # Shorthand for get("venues")
  # ====================================
  */

  venues(filter : any = {artists : []}){
    this.state("loading venues",true);
    return new Promise((resolve,reject)=>{
      if(this.index.venues.length > 0){
        this.state("loading venues",false);
        this.filterByID(filter , this.index.venues , resolve)
      }else{
        this.get("venues" , list => this.filterByID(filter , list , (list)=> {
          this.state("loading venues",false);
          resolve(list);
        }))
      }
    });
  }


  /*
  # ====================================
  # - EVENTS
  # ====================================
  */


  events(opts : any = {loadAll : false , forceLoad : false}){
    this.state("loading events",true);
    return new Promise((resolve,reject) =>{
      for(let key in this.dataConfig){
        if(!(opts.hasOwnProperty(key))){
          opts[key] = this.dataConfig[key]
        }
      }

      if(opts.loadAll === true){
        //console.log("Loading all");
        this.get("events" , () => resolve( this.queryEvents(opts) ) )
      } else if(Object.keys(this.index.event).length < 1 || opts.forceLoad == true){
        if(this.config.prebaked === true){
          //console.log("Load prebaked");
          this._loadJSONP('events',-1,`/${window.location.hostname}/events.json`
          , data =>  resolve( this.queryEvents(opts) ) )
        } else if(opts.events.length > 0){
          //console.log("Load events by id");
          asyncLoop (opts.events , true
          ,(event_id, isLast, next) => this.event( event_id ).then(next)
          ,() => resolve( this.queryEvents(opts) ) )
        }else if(opts.artists.length > 0){
          //console.log("Load events by artist");
          asyncLoop(opts.artists , true
          ,(artist_id, isLast, next) => this._loadJSONP('events',-1,`/artist/${artist_id}/events.json`,next)
          ,() => resolve( this.queryEvents(opts ) ) )
        }else{
          if(opts.venues.length < 1){
            //console.log("Load events for all venues");
            this.get("events" , () => resolve( this.queryEvents(opts ) ) )
          }else{
            //console.log("Load events by venue");
            asyncLoop (opts.venues , true
            , (venue_id, isLast, next) => this._loadJSONP('events',-1,`/venue/${venue_id}/events.json`,next)
            , () => resolve( this.queryEvents(opts ) ) )
          }
        }
      }else{
        //console.log("Nothing to load just return what's been loaded");
        resolve( this.queryEvents( opts , true ))
      }

    });




  }

}
