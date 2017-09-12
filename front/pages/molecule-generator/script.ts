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
  cache : any;

  constructor( private moleculeService : MoleculeService ){}

  moleculeSelected(selected){
    this.newMolecule = selected[0];
  }

  ngOnInit(){
    if(!this.cache){
      this.moleculeService.getMoleculeList({
        type : ['generator']
      }).then((cache)=>{
        this.cache = cache;
        this.generatorList = cache.data;
        this.ready = true;
      })
    }
  }

  log(what){
    console.log(what);
  }

}
