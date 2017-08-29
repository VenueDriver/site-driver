import { Component , Input , OnInit } from '@angular/core';



@Component({
  selector: 'file-node',
  template: require('./template.html'),
  styles : [require('./styles.css')],
  //encapsulation: ViewEncapsulation.None
})

export class FileNodeComponent implements OnInit{

  @Input() data : any;
  @Input() userRole : number = 0;
  panel : boolean = false;
  errors : Array<any> = [];

  constructor(){

  }

  ngOnInit(){
    this.validate(this.data._value);
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
