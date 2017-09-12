import { Component , OnInit } from '@angular/core';
import { ActivatedRoute , Router } from '@angular/router';
import { MoleculeService } from '../../services/molecule.service';


@Component({
  selector: 'cell-builder-page',
  template: require('./template.html')
})

export class CellBuilder implements OnInit{

  ready : boolean = true;
  cellList : Array<any>;
  cache : any;

  constructor(private moleculeService : MoleculeService){}

  log(what){
    console.log(what);
  }

  ngOnInit(){
    if(!this.cache){
      this.moleculeService.getMoleculeList({
        type : ['cell']
      }).then((cache)=>{
        this.cache = cache;
        this.cellList = cache.data;
        this.ready = true;
      })
    }
  }

}
