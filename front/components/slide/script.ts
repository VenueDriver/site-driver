import { Component , Input , OnInit } from '@angular/core';

@Component({
  selector: 'slide-field',
  template: require('./template.html')
})

export class SlideFieldComponent implements OnInit {

  @Input() data : any;
  @Input() userRole : number = 0;
  use_item_type : string;
  overwrite : boolean = false;
  panel : boolean = false;
  ready : boolean = false;
  filter_events : any = [];
  errors : Array<any> = [];


  constructor(){ }

  resetTMP(){
    this.data._value.tmp = {
      media : "",
      title : "",
      additional_text : "",
      buttons : [
        {label : "", url : ""},
        {label : "", url : ""}
      ]
    }
  }

  setDefaults(){
    this.data._value["media"] = "";
    this.data._value["title"] = "";
    this.data._value["additional_text"] = "";
    this.data._value["use_information_from"] = false;
    this.data._value["buttons"] = [
       {label : "", url : ""},
       {label : "", url : ""}
     ];
  }

  openPanel(){
    this.panel = true;
  }

  closePanel(){
    this.panel = false;
  }

  togglePanel(){
    this.panel = !this.panel;
  }

  isImage(value){
    return (['.jpg','.jpeg','.png','.gif','.bmp','.tif','.svg'].indexOf(this.data._value.media.match(/\.\w+$/)[0]) > -1)
  }

  grabFiles(files){
    this.data._value.media = files[0].src;
    this.closePanel();
    this.validate(this.data._value);
  }

  ngOnInit(){
    this.resetTMP();
    if(this.data._value.use_item_type){}else{this.data._value.use_item_type = "Custom Slide"};
    if(this.data._value.use_information_from){
      this.setDataItem(this.data._value.use_information_from , true);
    }
    this.validate(this.data._value);
  }

  setValue(event){
    //this.data._value = event.target.value;
    this.validate(this.data._value);
  }

  newItemToUse(itemType){
    this.overwrite = false;
    this.resetTMP();
    this.setDefaults();
  }

  updateFilter(venue){
    this.filter_events = [venue.id];
  }

  setDataItem(item,init = false){
    this.overwrite = false;
    this.resetTMP();
    if(!init){
      this.setDefaults();
      this.data._value.use_information_from = item;
    }
    switch(item.dataType){
      case "artist":
        this.data._value.tmp = {
          media : "//flyerdriver.com/flyer/squared/320/"+item.dataType+"/"+item.friendly_id+".png",
          title : item.name,
          additional_text : "",
          buttons : [
            {label : "", url : ""},
            {label : "", url : ""}
          ]
        }
      break
      case "venue":
        this.data._value.tmp = {
          media : "//flyerdriver.com/flyer/squared/320/"+item.dataType+"/"+item.friendly_id+".png",
          title : item.title,
          additional_text : item.description || "",
          buttons : [
            {label : "BUY TICKETS", url : "//ticketdriver.com/"+item.friendly_id+"/buy/tickets"},
            {label : "", url : ""}
          ]
        }
      break
      case "event":
        this.data._value.tmp = {
          media : "//flyerdriver.com/flyer/squared/320/"+item.dataType+"/"+item.id+".png",
          title : item.title,
          additional_text : item.short_description || "",
          buttons : [
            {label : "BUY TICKETS", url : "//ticketdriver.com/"+item.get_friendly_id+"/buy/tickets/event/"+item.id},
            {label : "RESERVE VIP", url : "//ticketdriver.com/"+item.get_friendly_id+"/apps/web/reservation?event="+item.id }
          ]
        }
      break
    }
  }

  validate(value){
    return new Promise((resolve,reject)=>{
      this.errors = [];
      if( value.media && value.media.length > 0 ){
        this.errors.push("Invalid or empty media.")
      }
      resolve(true);
    })
  }

}
