import { Component , Input , ViewEncapsulation , Output, EventEmitter } from '@angular/core';
import { KeysPipe } from '../../../pipes/keys';



@Component({
  selector: 'year',
  template: require('./template.html'),
  encapsulation: ViewEncapsulation.None
})

export class CalendarYear {
  @Input() year: any;
  @Input() y: number;
  @Output() reservationClick = new EventEmitter();

  reservationTrigger(event){
    this.reservationClick.emit(event);
  }
}
