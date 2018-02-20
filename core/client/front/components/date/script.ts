import { Component , Input , OnInit } from '@angular/core';
import {IMyOptions, IMyDateModel} from 'mydatepicker';

@Component({
  selector: 'date-field',
  template: require('./template.html')
})

export class DateFieldComponent implements OnInit {

  @Input() data : any;
  @Input() userRole : number = 0;
  calendar : boolean = false;
  errors : Array<any> = [];

  private myDatePickerOptions: IMyOptions = {
        dateFormat: 'yyyy-mm-dd',
        inline: true
  };

  ngOnInit(){
    this.validate(this.data._value);
  }

  constructor() {
  }

  setValue(event : IMyDateModel){
    console.log(this.data._value);
    this.data._value = new Date(event.jsdate).getTime();
    this.validate(this.data._value);
  }

  getDate(){
    return new Date(this.data._value);
  }

  validate(value){
    return new Promise((resolve,reject)=>{
      this.errors = [];
      if( (<any>new Date(value)) == "Invalid Date" ){
        this.errors.push("Invalid date value.")
      }
      if( value.length < 1 ){
        this.errors.push("The field is empty.")
      }
      resolve(true);
    })
  }

}
