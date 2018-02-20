import { Component, Input, ElementRef, HostBinding , OnInit , ViewEncapsulation} from '@angular/core';
import {PdService} from '../../services/pd.service';
import * as $ from 'jquery';
import 'owl.carousel';

@Component({
  selector: 'owl-carousel',
  template: `<ng-content></ng-content>`,
  styles : [
    require('../../../node_modules/owl.carousel/dist/assets/owl.carousel.min.css'),
    require('../../../node_modules/owl.carousel/dist/assets/owl.theme.default.min.css')
  ],
  encapsulation: ViewEncapsulation.None
})

export class OwlCarousel {
  @HostBinding('class') defaultClass = 'owl-carousel';
  @Input() options: any;
  @Input() items: number;
  $owlElement: any;
  defaultOptions: any = {items : 3};

  constructor(private el: ElementRef , private PdService : PdService) {}

  ngAfterViewChecked(){
    for (var key in this.options) {
      this.defaultOptions[key] = this.options[key];
    }
    if($('.owl-carousel .event').length >= this.items){
      this.$owlElement = (<any>$(this.el.nativeElement)).owlCarousel(this.defaultOptions);
    }
  }



}
