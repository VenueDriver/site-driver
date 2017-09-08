import { Component , Input , OnInit } from '@angular/core';
import { MoleculeService } from '../../services/molecule.service';
import { DataService } from '../../services/data.service';
import { NgClass } from '@angular/common';

@Component({
  selector: 'cell',
  template: require('./template.html')
})

export class CellComponent implements OnInit {

  @Input() data : any;
  additional_classes : any = [];
  isDeveloper : boolean = false;
  newMolecule : any;
  reduced : boolean = false;
  editing : boolean = false;
  ready : boolean = false;

  constructor(
    private moleculeService : MoleculeService,
    private dataService : DataService
  ){

  }

  moleculeSelected(selected){
    this.newMolecule = Object.assign({},selected[0]);
  }

  ngOnChanges(){
    this.parseAdditionalClasses();
  }

  parseAdditionalClasses(){
    console.log("Parsing classes",this.data._options._additional_css_classes);
    if(this.data._options){
      if(this.data._options._additional_css_classes) this.additional_classes = this.data._options._additional_css_classes.split(',');
    }
  }

  ngOnInit(){
    this.parseAdditionalClasses();
    this.dataService.userRole().then((data)=>{
      this.isDeveloper = (<any>data).role > 9000;
      this.ready = true;
    })
  }

  resetMolecule(event){
    this.moleculeSelected(this.newMolecule);
  }


}
