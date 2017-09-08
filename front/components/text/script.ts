import { Component , Input , OnInit } from '@angular/core';
import { NgClass } from '@angular/common';

@Component({
  selector: 'text',
  template: require('./template.html')
})

export class TextNodeComponent implements OnInit {

  @Input() data : any;
  additional_classes : any = [];
  @Input() userRole : number = 0;
  errors : Array<any> = [];
  ckeditorContent :any;


  constructor(){

  }

  parseAdditionalClasses(){
    console.log("Parsing classes",this.data._options._additional_css_classes);
    if(this.data._options){
      if(this.data._options._additional_css_classes) this.additional_classes = this.data._options._additional_css_classes.split(',');
    }
  }

  ngOnInit(){
    this.parseAdditionalClasses();
    this.validate(this.data._value);
  }

  ngOnChanges(){
    this.parseAdditionalClasses();
  }

  setValue(event){
    //this.data._value = event.target.value;
    this.validate(this.data._value);
  }

  validate(value){
    return new Promise((resolve,reject)=>{
      this.errors = [];
      if( typeof value !== "string" || value.length < 1){
        this.errors.push("Invalid or empty value.")
      }
      resolve(true);
    })
  }

}
