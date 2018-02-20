import { Directive, ElementRef , OnInit , HostListener, Inject , Renderer} from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';

@Directive({ selector: '[fixedElement]' })

export class FixedElementDirective implements OnInit {

  originalPosition : number;
  landmark : any;

  constructor(@Inject(DOCUMENT) private document: Document , private el : ElementRef , private _renderer : Renderer) {
    this.landmark = [];
  }

  @HostListener("window:scroll", [])
  onWindowScroll() {
    let screenScroll = this.document.body.scrollTop;
    let landmarkPosition = this.landmark.getBoundingClientRect();
    if(landmarkPosition.top < 1){
      this._renderer.setElementClass(this.el.nativeElement, 'fixed-element-active', true);
    }else{
      this._renderer.setElementClass(this.el.nativeElement, 'fixed-element-active', false);
    }
  }



  ngOnInit() {
    this.el.nativeElement.insertAdjacentHTML('beforebegin', "<div class='fixed-element-landmark'></div>");
    this.landmark = this.el.nativeElement.previousSibling;
  }

}
