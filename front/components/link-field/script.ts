import { Component , Input , OnInit } from '@angular/core';

@Component({
  selector: 'link-field',
  template: require('./template.html')
})

export class LinkFieldComponent implements OnInit {

  @Input() data : any;
  @Input() userRole : number = 0;
  errors : Array<any> = [];


  constructor(){

  }

  ngOnInit(){
    this.validate(this.data._value);
  }

  setValue(event){
    //this.data._value = event.target.value;
    this.validate(this.data._value);
  }

  validate(value){
    return new Promise((resolve,reject)=>{
      this.errors = [];
      if( (value.label && value.url) && (value.label.length > 0 && value.url.length > 0) ){
        this.errors.push("Invalid or empty value.")
      }
      resolve(true);
    })
  }

}
