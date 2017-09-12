import { Component , OnInit } from '@angular/core';
import { ActivatedRoute , Router } from '@angular/router';
import { CellInterface } from '../../../definitions/interfaces';
import { MoleculeService } from '../../services/molecule.service';

@Component({
  selector: 'generator-page',
  template: require('./template.html'),
})

export class GeneratorPage implements OnInit {

    ready : boolean = false;
    cache :any;
    cacheSecondary : any;
    generatorName : string;
    generator : any;
    newMolecule : any;
    useMolecules : Array<string>;
    instances : Array<any>;
    private sub: any;

    constructor(private route: ActivatedRoute , private moleculeService : MoleculeService){}

    log(what){
      console.log(what);
    }

    moleculeSelected(molecule){
      // console.log("Selected",molecule);
      this.newMolecule = molecule;
    }

    ngOnInit() {
      this.sub = this.route.params.subscribe(params => {
         this.generatorName = params['generator_name'];
         this.moleculeService.getMoleculeList({
           type : ["generator"],
           where : {
             _name : this.generatorName
         }}).then((generatorCache)=>{
         this.cacheSecondary = generatorCache;
         this.generator = generatorCache.data[0];
        //  console.log("Showing generator:",this.generator._name,this.generator);
         this.useMolecules = this.generator._options._molecule_types._value.map((value)=> value._name);
         if(!this.cache){
           this.moleculeService.getMoleculeList({
             type : ["instance"],
             name : this.useMolecules,
             where : {
               _generator : {
                 _name : this.generatorName
               }
           }}).then((mainCache)=>{
             this.cache = mainCache;
            //  console.log("Has instances:",instances);
             this.instances = mainCache.data;
             this.ready = true;
           });
         }else{
           this.ready = true;
         }
         });
      });
    }

    ngOnDestroy() {
      this.sub.unsubscribe();
    }

}
