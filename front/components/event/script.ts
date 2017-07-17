import { Component , Input , OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { TruncatePipe } from '../../pipes/truncate';

@Component({
  selector: 'event',
  template: require('./template.html')
})

export class EventFieldComponent {

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

  ngOnInit(){

  }

  validate(value){
    return new Promise((resolve,reject)=>{
      this.errors = [];
      if( value && value.dataType !== "event"){
        this.errors.push("Invalid event value.")
      }
      if( value === null || value === undefined || !value ){
        this.errors.push("Field required.")
      }
      resolve(true);
    })
  }

}
