import 'rxjs/add/operator/toPromise';

export function postProcessData(events : any, fromCache :boolean = false) : Promise<any> {
  // THIS IS AN ASYNCHRONOUS FUNCTION
  // RETURNS A PROMISE RIGHT AWAY
  return new Promise((resolve,reject)=>{
    if(!fromCache){
      // ============ YOUR FUNCTION SHOULD -START- HERE ============

      // BTW THIS TIMEOUT IS JUST AN EXAMPLE OF ASYNCHRONOUS FUNCTION
      // YOU CAN REPLACE IT WITH YOUR CODE
      setTimeout(()=>{

        // MAKE ASYNCHRONOUS THINGS LIKE REQUESTS AND SUCH
        // OR MAYBE JUST PARSE INFORMATION IN SOME WAY
        events.forEach( (ev) => {
          if(!ev.postprocessed){
            if(ev.flyers.length > 0){
              ev.flyer_url = "https://s3.amazonaws.com/venuedriver_flyers/"+ev.flyers[ev.flyers.length-1].id+"/original/" + ev.flyers[ev.flyers.length-1].asset_file_name;
            }
            ev.postprocessed = true;
          }
        })


        // THEN JUST RESOLVE PASSING THE EVENT BACK TO THE SERVICE
        resolve(events);
      },0)

      // ============ YOUR FUNCTION SHOULD -END- BEFORE THIS COMMENT ============
    }else{
      resolve(events);
    }
  })
}
