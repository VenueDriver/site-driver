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
  styles : [`
    table{ width: 100% }
    tr {
      background:#fff;
      border: 1px solid #ccc;
    }
    td {
      padding:10px;
    }
    thead td{
      font-weight:bold;
    }
    `]
})

export class TableRenderer {

  @Input() columns : Array<string>;
  @Input() list : Array<any>;

  constructor(){}

}
