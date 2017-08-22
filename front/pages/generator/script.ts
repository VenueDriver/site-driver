import { Component , OnInit } from '@angular/core';
import { ActivatedRoute , Router } from '@angular/router';
import { CellInterface } from '../../../definitions/interfaces';
import { MoleculeService } from '../../services/molecule.service';

@Component({
  selector: 'generator-page',
  template: require('./template.html'),
  styles : [`
    table{ width: 100% }
    tr {
      background:#fff;
      border: 1px solid #ccc;
    }
    td {
      padding:10px;
    }
    thead td{
      font-weight:bold;
    }
    `]
})

export class GeneratorPage implements OnInit {

    ready : boolean = false;
    generatorName : string;
    generator : any;
    newMolecule : any;
    useMolecules : Array<string>;
    private sub: any;

    constructor(private route: ActivatedRoute , private moleculeService : MoleculeService){}

    log(what){
      console.log(what);
    }

    moleculeSelected(molecule){
      console.log("Selected",molecule);
      this.newMolecule = molecule;
    }

    ngOnInit() {
      this.sub = this.route.params.subscribe(params => {
         this.generatorName = params['generator_name'];
         this.moleculeService.getMoleculeList({
           type : "generator",
           where : {
             _name : params['generator_name']
           }}).then((generator)=>{
           generator = generator[0];
           console.log("GENERATOR:",generator);
           this.ready = true;
         });
      });
    }

    ngOnDestroy() {
      this.sub.unsubscribe();
    }

}
