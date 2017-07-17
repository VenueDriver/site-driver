import { Component } from '@angular/core';

@Component({
  selector: 'page-header',
  template: require('./template.html')
})

export class PageHeader {

  open : boolean = false;

  constructor(){}

  openNav(){
    this.open = true;
  }

  closeNav(){
    this.open = false;
  }

  toggleNav(){
    this.open = !this.open;
  }

}
