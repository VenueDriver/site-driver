import { Component } from '@angular/core';

@Component({
  selector: 'page',
  template: `<page-header></page-header><ng-content></ng-content><page-footer></page-footer>`
})

export class PageComponent {

  constructor(){}

}
