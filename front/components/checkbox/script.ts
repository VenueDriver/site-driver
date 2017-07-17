import { Component , Input } from '@angular/core';

@Component({
  selector: 'ng-checkbox',
  template: require('./template.html'),
  styles : [require('./styles.css')]
})

export class CheckboxComponent {

  @Input() checked : boolean;

  constructor(){}

}
