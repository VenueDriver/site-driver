import { Component , Input } from '@angular/core';

@Component({
  selector: 'spinner',
  template: require('./template.html'),
  styles : [require('./styles.css')]
})

export class Spinner{
  @Input() ready : boolean;

  constructor(){}
}
