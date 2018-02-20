import { Component , Input , OnInit } from '@angular/core';
import { Group } from '../../../models/models';

@Component({
  selector: 'group',
  template: require('./template.html')
})

export class GroupComponent implements OnInit {

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
