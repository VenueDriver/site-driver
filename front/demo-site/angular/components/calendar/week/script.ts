import { Component , Input , ViewEncapsulation , Output, EventEmitter } from '@angular/core';
import { KeysPipe } from '../../../pipes/keys';



@Component({
  selector: 'week',
  template: require('./template.html'),
  encapsulation: ViewEncapsulation.None
})

export class CalendarWeek {
  @Input() week: any;
  @Input() month: any;
  @Output() reservationClick = new EventEmitter();

  reservationTrigger(event){
    this.reservationClick.emit(event);
  }

}
