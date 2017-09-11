import { Component , Input , OnInit} from '@angular/core';
import { NgClass } from '@angular/common';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'boolean-node',
  template: require('./template.html')
})

export class BooleanNodeComponent implements OnInit {

  @Input() data : any;
  @Input() userRole : number;
  additional_classes : any = [];
  isDeveloper : boolean = false;
  errors : Array<any> = [];
  editing : boolean = false;
  ready : boolean = false;

  constructor(
    private dataService : DataService
  ){

  }

  parseAdditionalClasses(){
    if(this.data._options){
      if(this.data._options._additional_css_classes) this.additional_classes = this.data._options._additional_css_classes.split(',');
    }
  }

  ngOnInit(){
    this.parseAdditionalClasses();
    this.validate(this.data._value);
    this.dataService.userRole().then((data)=>{
      this.isDeveloper = (<any>data).role > 9000;
      this.ready = true;
    })
  }

  ngOnChanges(){
    this.parseAdditionalClasses();
  }

  setValue(event){
    //this.data._value = event.target.value;
    this.validate(this.data._value);
  }

  toggle(){
    if(this.data._can._edit_value == true || this.isDeveloper){
      this.data._value = !this.data._value;
    }
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
