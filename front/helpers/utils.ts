  //CHECK IF AND OBJECT HAS PROPERTIES
  export function isEmpty(obj:any) : boolean {
    return Object.keys(obj).length < 1
  }

  //CHECK IF IS ARRAY
  export function isArray(obj){
    return (Object.prototype.toString.call(obj) == "[object Array]");
  }

  //DEEP MERGE OBJECTS
  export function merge (obj1 , obj2 , opts){
    let add, prop, val;
    obj1 = Object.assign({}, obj1);
    add = function(prop) {
      if (!(!opts.usenull && !(obj2[prop] != null))) {
        return obj1[prop] = obj2[prop];
      }
    };
    if (isArray(obj1) || isArray(obj2)) {
      if (obj2 != null) {
        obj1 = obj2;
      }
    } else {
      for (prop in obj2) {
        val = obj2[prop];
        if (obj1.hasOwnProperty(prop)) {
          if (typeof obj1[prop] === "object") {
            if (typeof obj2[prop] === "object" && opts.usedeep) {
              obj1[prop] = merge(obj1[prop], obj2[prop], opts);
            } else {
              add(prop);
            }
          } else {
            add(prop);
          }
        } else {
          add(prop);
        }
      }
    }
    return obj1;
  }


  //SET DATE OFFSET
  export function dateSetOffset(date: Date,offset:number) : Date{
    let hours = date.getTimezoneOffset() / 60;
    date.setHours(date.getHours() + hours + offset);
    return date;
  }

  //CUSTOM FOR EACH
  export function each(obj : any,work : any){
    for(let key of Object.keys(obj)){
      work(obj[key]);
    }
  }

  export function aloop(condition,work,end){
    if ( condition() ){
      end()
    }else{
      work(()=>{
        aloop(condition,work,end)
      },end)
    }
  }

  //ASYNC WORK EXECUTED ON AN ARRAY
  export function asyncLoop(
    source : any[] ,
    clone : boolean = false ,
    work : any ,
    end : any ,
    index : number = 0
  ){
    let sourceRef : any[] = source;

    // IF CLONE USE A COPY OF THE SOURCE
    if(clone){
      source = [];
      for(let item of sourceRef){
        source.push(item);
      }
    }

    // WORK WHILE THERE ARE ITEMS
    work(source[index] , index , ()=>{
      if(source.length-1 > index){
        this.asyncLoop(source , clone , work , end,index+1)
      }
      else{
        end(source)
      }
    })
    return source;
  }
