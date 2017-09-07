import { Component , OnInit } from '@angular/core';
import { ActivatedRoute , Router } from '@angular/router';
import { CellInterface } from '../../../definitions/interfaces';
import { MoleculeService } from '../../services/molecule.service';

@Component({
  selector: 'instance-page',
  template: require('./template.html'),
})

export class InstancePage implements OnInit {

    ready : boolean = false;
    instanceID : string;
    instances : Array<any>;
    data : any;
    private sub: any;

    constructor(private route: ActivatedRoute , private moleculeService : MoleculeService){}

    log(what){
      console.log(what);
    }

    ngOnInit() {
      this.sub = this.route.params.subscribe(params => {
         this.instanceID = params['id'];
         console.log("PARAM ID:",params['id']);
         console.log("Instance ID",this.instanceID);
         this.moleculeService.getMoleculeList({
           type : ["instance"],
           id : this.instanceID,
           where : {
             _id : this.instanceID
           }
          }).then((instance)=>{
           console.log("Instance served",instance);
           this.data = instance[0];

           if(this.data._ngClass === "MoleculeGenerator"){
             this.moleculeService.getMoleculeList({
               type : ["instance"],
               name : this.data._options._molecule_types._value.map(value=>value._name),
               where : {
                 _generator : {
                   _name : this.data._name,
                   _id : this.data._id
                 }
              }
            }).then((instances)=>{
               console.log("Has instances:",instances);
               this.instances = instances;
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
