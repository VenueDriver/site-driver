import { Component , Input , OnInit , Output, EventEmitter} from '@angular/core';
import { NgClass } from '@angular/common';



@Component({
  selector: 'file-node',
  template: require('./template.html'),
  styles : [require('./styles.css')],
  //encapsulation: ViewEncapsulation.None
})

export class FileNodeComponent implements OnInit{

  @Input() data : any = { _can : { _edit_value : true } , _options : {} , _value : ''};
  @Input() userRole : number = 0;
  @Output() valueChange = new EventEmitter();

  additional_classes : any = [];
  panel : boolean = false;
  errors : Array<any> = [];

  constructor(){

  }

  ngOnInit(){
    this.validate(this.data._value);
    this.parseAdditionalClasses();
  }

  ngOnChanges(){
    this.parseAdditionalClasses();
  }

  parseAdditionalClasses(){
    console.log("Parsing classes",this.data._options._additional_css_classes);
    if(this.data._options){
      if(this.data._options._additional_css_classes) this.additional_classes = this.data._options._additional_css_classes.split(',');
    }
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

  isImage(){
    return (['.jpg','.jpeg','.png'].indexOf(this.data._value.match(/\.\w+$/)[0]) > -1)
  }

  grabFiles(files){
    this.data._value = files[0].src;
    this.valueChange.emit(files[0].src);
    this.closePanel();
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
