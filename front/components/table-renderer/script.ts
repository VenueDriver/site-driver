import {
    Component,
    Input,
    Output,
    EventEmitter,
  } from '@angular/core';

// Helper component to add dynamic components
@Component({
  selector: 'table-renderer',
  template: require('./template.html'),
})

export class TableRenderer {

  @Input() columns : Array<string>;
  @Input() list : Array<any>;
  showEdition: any = {};

  constructor(){

  }

  editOpen(index){
    if(!this.showEdition.hasOwnProperty(index)) this.showEdition[index] = false;
    this.showEdition[index] = !this.showEdition[index];
  }

}
