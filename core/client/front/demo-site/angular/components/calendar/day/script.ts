import { Component , Input , ViewEncapsulation , ElementRef , HostBinding , Output, EventEmitter } from '@angular/core';
import { WindowRef } from '../../../helpers/window-ref';
import { Config } from '../../../services/config.service';
import { KeysPipe } from '../../../pipes/keys';
import * as $ from 'jquery';



@Component({
  selector: '[day]',
  template: require('./template.html'),
  encapsulation: ViewEncapsulation.None
})

export class CalendarDay {
  @Input() day: any;
  @Input() d: number;
  @Output() reservationClick = new EventEmitter();

  private reservationOpen : boolean = false;
  selectedEvent : any ;

  private open : boolean = false;

  popup : any;

  constructor(private el : ElementRef,  private WindowRef : WindowRef , private config : Config ){
    this.selectedEvent = {};
    this.resizePopup();
  }

  mouseIn(ev){
    this.resizePopup();
    this.open = true;
  }

  mouseOut(){
    this.open = false;
  }

  resizePopup(){
    let el = this.el.nativeElement;
    $(el).find('.event-card').css("height","auto");
    this.popup = {
      l : "auto",
      r : "auto",
      t : 0,
      h : $(el).outerHeight() - 2,
      h2 : $(el).find('.event-card').outerHeight()  - $(el).outerHeight() + 2,
      h3 : $(el).find('.event-card').outerHeight(),
      w : $(el).outerWidth() - 2
    }


    if($(el).outerHeight() + $(el).find('.card-actions').outerHeight() > $(el).find('.event-card .keep-aspect-ratio').outerHeight()){
      $(el).find('.event-card').css({
        "height" : ($(el).outerHeight() + $(el).find('.card-actions').outerHeight() -2) +"px"
      })
    }

    if(this.WindowRef.nativeWindow.innerWidth - el.offsetLeft > this.WindowRef.nativeWindow.innerWidth/2){
      // LEFT SIDE
      this.popup.l = $(el).outerWidth();
    }else{
      // RIGHT SIDE
      this.popup.r = $(el).outerWidth();
    }
  }

  windowResize(ev){
    this.resizePopup();
  }

  reservationTrigger(event){
    this.reservationClick.emit(event);
  }



}
