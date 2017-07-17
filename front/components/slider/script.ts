import { Component , Input , OnInit } from '@angular/core';

@Component({
  selector: 'slider-field',
  template: require('./template.html')
})

export class SliderFieldComponent implements OnInit {
  @Input() data : any;
  @Input() userRole : number = 0;
  reduced : boolean = false;
  ready : boolean = false;

  constructor(){

  }

  ngOnInit(){
    this.ready = true;
  }

}
