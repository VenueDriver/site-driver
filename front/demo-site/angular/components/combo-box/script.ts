import { Component, Input , ElementRef ,  Output, EventEmitter} from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'combo-box',
  template: require('./template.html'),
  styles : [require('./styles.css')]
})

export class ComboBox {
  @Input() options: any;
  @Input() default: any;
  @Input() name: string;
  @Output() valueChange = new EventEmitter();
  private open : boolean = false;
  private selectedOption : any;

  constructor(private el: ElementRef , private router: Router ){
    this.selectedOption = {text: "" , value : ""};
  }

  ngAfterViewInit(){
    this.selectedOption = this.default;
  }

  ngAfterViewChecked(){
    this.selectedOption = this.default;
    this.options = this.options;
  }

  triggerSelect(){
    this.open = !this.open;
  }


  onChange(option) {
    this.selectedOption = option;
    this.triggerSelect();
    this.valueChange.emit({name : this.name, option});
  }


}
