import { Component , Input , OnInit } from '@angular/core';

@Component({
  selector: 'venue',
  template: require('./template.html')
})

export class VenueFieldComponent {

  @Input() data : any;
  @Input() userRole : number = 0;
  ready : boolean = false;
  errors : Array<any> = [];

  constructor(){

  }

  setValue(value){
    this.data._value = value;
    this.validate(value);
  }


  ngOnInit(){}


  validate(value){
    return new Promise((resolve,reject)=>{
      this.errors = [];
      if( value && value.dataType !== "venue"){
        this.errors.push("Invalid venue value.")
      }
      if( value === null || value === undefined || !value ){
        this.errors.push("Field required.")
      }
      resolve(true);
    })
  }

}
