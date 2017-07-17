import { Component , OnInit } from '@angular/core';
import { WindowRef } from '../../helpers/window-ref';
import { PdService } from '../../services/pd.service';
import { Config } from '../../services/config.service';


@Component({
  selector: 'event-slider',
  template: require('./template.html'),
  styles : [require('./styles.css')]
})

export class EventSlider implements OnInit {
  private ready : boolean;
  private events : any;
  private carouselOptions : any;
  private reservationOpen : boolean = false;
  selectedEvent : any ;

  constructor(private PdService : PdService , private WindowRef : WindowRef , private config: Config ){
    this.events = [];
    this.selectedEvent = {};
    this.carouselOptions = {
      items:1,
      pagination : false,
      responsive : {
          1300 : {
            items : 4
          },
          960 : {
            items : 3
          },
          768 : {
            items : 2
          }
        }
      };
  }

  ngOnInit(){
    this.PdService.events().then((index : any) => {
      this.selectedEvent = index.events[0];
      this.ready = true;
      for(let i =0;i < 4;i++){
        this.events.push(index.events[i]);
      }
    });
  }

  openReservation() {
    this.reservationOpen = true;
  }

  closeReservation() {
    this.reservationOpen = false;
  }
  selectEvent(ev){
    this.selectedEvent = ev;
  }

}
