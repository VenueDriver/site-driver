import { Component } from '@angular/core';

@Component({
  selector: 'modal',
  template: require('./template.html'),
  styles : [require('./styles.css')],
  //encapsulation: ViewEncapsulation.None
})

export class ModalComponent {

  panel : boolean = false;

  constructor(){

  }

  showPanel(){
    this.panel = true;
  }

  hidePanel(){
    this.panel = false;
  }

}
