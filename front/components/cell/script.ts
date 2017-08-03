import { Component , Input , OnInit } from '@angular/core';

@Component({
  selector: 'cell',
  template: require('./template.html')
})

export class CellComponent implements OnInit {

  @Input() data : any;
  @Input() userRole : number = 0;
  reduced = false;
  ready : boolean = false;

  constructor(){

  }

  ngOnInit(){
    this.ready = true;
  }

}
