import { Component , ElementRef , Renderer , ViewEncapsulation , Input } from '@angular/core';

@Component({
  selector: 'img[magic]',
  template: `<ng-content></ng-content>`,
  styles : [require('./styles.css')],
  encapsulation: ViewEncapsulation.None
})

export class Image{

  constructor(el : ElementRef , renderer: Renderer){
    el.nativeElement.style.opacity = 0.0;
    renderer.listen(el.nativeElement, 'load', this.showImage );
  }

  showImage(event){
    event.target.style.opacity = 1.0;
    event.target.className += " ready";
  }
}
