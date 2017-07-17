import { Component , Input } from '@angular/core';
import * as $ from 'jquery';


@Component({
  selector: 'overlay',
  template: `<ng-content></ng-content>`,
  styles : [require('./styles.css')]
})

export class OverlayComponent {
  private ready : boolean;
  private events : any;
  @Input() open : boolean;

  constructor() {
  }

  ngOnChanges(){
    if(this.open){
      $('body,html').addClass("no-scroll");
    }else{
      $('body,html').removeClass("no-scroll");
    }
  }



}
