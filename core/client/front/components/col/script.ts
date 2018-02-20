import { Component , Input } from '@angular/core';
import { Column } from '../../../models/models';

@Component({
  selector: 'column',
  template: require('./template.html')
})

export class ColumnComponent {

  @Input() data : any;

  constructor(){}

}
