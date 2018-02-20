import { Component , OnInit, Input } from '@angular/core';
import { DataService } from '../../services/data.service';

import layouts from "./layouts";

@Component({
  selector: 'molecule-generator',
  template: require('./template.html'),
})

export class MoleculeGeneratorComponent implements OnInit {

  @Input() data : any;
  @Input() instances : Array<any> = [];

  isDeveloper : boolean = false;
  ready : boolean = false;
  animated : boolean = false;
  animated_modal : boolean = false;
  selectedLayout : string = "Default";

  show_new_molecule_form : boolean = false;

  constructor(
    private dataService : DataService
  ){}

  ngOnInit() {
    console.log("GeneratorComponent",this.data);
    if(layouts.name.indexOf(this.data._options._layout) > -1) this.selectedLayout = this.data._options._layout;
    // console.log(this.data._name,"Use Layout",this.data._options._layout);
    // console.log(layouts.name.indexOf(this.data._options._layout) > -1,"Available layouts",layouts);
    this.dataService.userRole().then((data)=>{
      this.ready = true;
      setTimeout(()=>{this.animated = true},100);
      this.isDeveloper = (<any>data).role > 9000;
    })
  }

  getComponent(layoutName){
    console.log("Get layout component");
    return layouts.ngComponent[layoutName];
  }

  toggleModal(){
    this.show_new_molecule_form = !this.show_new_molecule_form;
    setTimeout(()=>{this.animated_modal = true},100);
  }

}
