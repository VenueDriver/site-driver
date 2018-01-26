class QueryFilter{

  constructor(query){
    this.query = query;
  }

  deep(criteria,item){
    let valid = true;
    console.log(item);
    for(let key in criteria){
      if(["string","number"].indexOf(typeof criteria[key]) > -1){
        valid = item[key] == criteria[key];
      }
      if(["object"].indexOf(typeof criteria[key]) > -1 && !Array.isArray(criteria[key])){
        console.log("Looping in:",key);
        if(item.hasOwnProperty(key)){
          return this.deep(criteria[key],item[key]);
        }else{
          valid = false;
        }
      }
    }
    return valid;
  }

  filter(list){
    // console.log("QueryFilter.filter, start");
    console.log("Filter query:",this.query);
    if(this.query.hasOwnProperty("where")){
      list = list.filter(item=>{
        return this.deep(this.query.where,item);
      });
    }

    // console.log("QueryFilter.filter, done");
    return list;
  }

}

module.exports = QueryFilter;
