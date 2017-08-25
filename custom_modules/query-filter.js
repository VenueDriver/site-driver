class QueryFilter{

  constructor(query){
    this.query = query;
    console.log("QueryFilter:",query);
  }

  deep(criteria,item){
    let valid = true;
    for(let key in criteria){
      if(["string","number"].indexOf(typeof criteria[key]) > -1){
        valid = item[key] == criteria[key];
      }
      if(["object"].indexOf(typeof criteria[key]) > -1 && !Array.isArray(criteria[key])){
        return this.deep(criteria[key],item[key]);
      }
    }
    return valid;
  }

  filter(list){
    console.log("Elements received:",list.length);

    if(this.query.hasOwnProperty("where")){
      list = list.filter(item=>{
        return this.deep(this.query.where,item);
      });
    }

    console.log("Elements sent:",list.length);
    return list;
  }

}

module.exports = QueryFilter;
