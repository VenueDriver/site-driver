import { Component , OnInit, Input } from '@angular/core';
import layouts from "./layouts";

@Component({
  selector: 'molecule-generator',
  template: require('./template.html'),
})

export class MoleculeGeneratorComponent implements OnInit {

  @Input() data : any;
  @Input() instances : Array<any>;

  ready : boolean = false;
  selectedLayout : string = "Default";

  constructor(

  ){}

  ngOnInit() {
    if(layouts.name.indexOf(this.data._options._layout) > -1) this.selectedLayout = this.data._options._layout;
    // console.log(this.data._name,"Use Layout",this.data._options._layout);
    // console.log(layouts.name.indexOf(this.data._options._layout) > -1,"Available layouts",layouts);
    this.ready = true;
  }

  getComponent(layoutName){
    return layouts.ngComponent[layoutName];
  }

}
