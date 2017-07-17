import { Component , Input , OnInit} from '@angular/core';

@Component({
  selector: 'number',
  template: require('./template.html')
})

export class NumberFieldComponent implements OnInit {

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
      if( typeof value !== "number"){
        this.errors.push("Invalid or empty value.")
      }
      resolve(true);
    })
  }

}
