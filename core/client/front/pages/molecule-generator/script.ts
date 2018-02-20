import { Component , OnInit } from '@angular/core';
import { ActivatedRoute , Router } from '@angular/router';
import { MoleculeGeneratorInterface } from '../../../definitions/interfaces';
import { MoleculeService } from '../../services/molecule.service';

@Component({
  selector: 'molecule-generator-page',
  template: require('./template.html')
})

export class MoleculeGenerator implements OnInit {

  newMolecule : any;
  reduced = false;
  generatorList : any;
  ready : boolean = false;

  constructor( private moleculeService : MoleculeService ){}

  moleculeSelected(selected){
    this.newMolecule = selected[0];
  }

  ngOnInit(){
    this.moleculeService.getMoleculeList({
      type : ['generator']
    }).then((data)=>{
      this.generatorList = data;
      this.ready = true;
    })
  }

  log(what){
    console.log(what);
  }

}
