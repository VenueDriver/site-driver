import { Component , Input , OnInit } from '@angular/core';

@Component({
  selector: 'list',
  template: require('./template.html')
})

export class ListFieldComponent implements OnInit {

  @Input() data : any;
  @Input() userRole : number = 0;
  ready : boolean = false;
  reduced : boolean = false;

  constructor(){

  }

  ngOnInit(){
    this.ready = true;
  }

}
