import { Component , Input } from '@angular/core';

@Component({
  selector: 'row',
  template: require('./template.html')
})

export class RowComponent {

  @Input() data : any;

  constructor(){}

}
