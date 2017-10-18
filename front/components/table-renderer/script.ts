import {
    Component,
    Input,
    OnInit,
    Output,
    EventEmitter,
  } from '@angular/core';

// Helper component to add dynamic components
@Component({
  selector: 'table-renderer',
  template: require('./template.html'),
})

export class TableRenderer implements OnInit {

  @Input() columns : any;
  parsedColumns : any;
  @Input() list : Array<any>;
  showEdition : any = {};
  openingEditInstance : any = {};


  constructor(){

  }

  ngOnChanges(){
    this.parseColumnsData();
  }

  ngOnInit(){
    this.parseColumnsData();
  }

  parseColumnsData(){
    // console.log("Column:",this.columns);
    let err;
    if(this.columns && typeof this.columns === "string"){
      try{
        JSON.parse(this.columns);
      }catch(e){
        err = e;
      }
      if(err){
        this.parsedColumns = '';
      }else{
        this.parsedColumns = JSON.parse(this.columns);
      }
    }else{
      this.parsedColumns = this.columns;
    }
    if(err) console.error("Error parssing at table renderer component:\n","Original data:\n=============\n",this.columns,"\n=============\n",this.parsedColumns,"error:",err,);
  }

  editOpen(index : number){
    if(!this.showEdition.hasOwnProperty(index)) this.showEdition[index] = false;
    this.showEdition[index] = !this.showEdition[index];
  }

  openEditInstance(index : number){
    if(!this.openingEditInstance.hasOwnProperty(index)) this.openingEditInstance[index] = false;
    this.openingEditInstance[index] = !this.openingEditInstance[index];
  }


  getColumnData(item, column){

    let path = column.path.map(el=>el);
    let value = Object.assign({},item);
    for(let i = 0; i < path.length; i++){
      let prop = path[i];
      if(typeof prop !== "string"){
        let deppSearch = value.find(el=>{
          let match = true;
          Object.keys(prop.in).forEach((key)=>{
            if(el[key] != prop.in[key]) match = false;
          });
          return match;
        })

        if(deppSearch){
          value = deppSearch[prop.find];
        }else{
          value = '';
          return value;
        }
      }else if(value.hasOwnProperty(prop)){
        value = value[prop];
      }else{
        value = '';
        return value;
      }
    }
    return value;
  }

  log(message){
    console.log(message);
  }

}
