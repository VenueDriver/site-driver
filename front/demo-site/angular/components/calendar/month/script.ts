import { Component , Input , OnInit , ViewEncapsulation , Output, EventEmitter } from '@angular/core';
import { KeysPipe } from '../../../pipes/keys';

@Component({
  selector: 'month',
  template: require('./template.html'),
  encapsulation: ViewEncapsulation.None
})

export class CalendarMonth {
  @Input() month: any;
  @Input() m: number;
  @Input() y: number;
  @Output() reservationClick = new EventEmitter();
  weeks : any[];

  constructor(){

  }

  reservationTrigger(event){
    this.reservationClick.emit(event);
  }

  calculateWeeks(){
    this.weeks = [];
    let weekData = {days : []};
    for(let day = 1; day <= this.month.length ; day++){
      weekData.days.push(this.month.days[day]);
      if(this.month.days[day].index >= 6 || day == this.month.length){

        // FILL SHORT WEEKS WITH EMPTY DAYS
        if(weekData.days.length < 7){
          // CREATE AN EMPTY DAY
          let emptyDay = {number:"",name:"",month:"",month_number:"",events:[],isPlaceHolder:true};

          // DAY GOES AT THE END
          if(weekData.days[0].index === 0){
            let daysLeft = 6 - weekData.days[weekData.days.length-1].index;
            for(let dl = 0 ; dl < daysLeft ; dl++ ){
              weekData.days.push(emptyDay);
            }
          // DAY GOES AT THE BEGINING
          }else{
            let daysLeft = weekData.days[0].index;
            for(let dl = 0 ; dl < daysLeft ; dl++ ){
              weekData.days.unshift(emptyDay);
            }
          }
        }

        this.weeks.push(weekData);
        weekData = {days : []};
      }
    }
  }

  ngOnInit() {
    this.calculateWeeks();
  }

  ngOnChanges(){
    this.calculateWeeks();
  }

}
