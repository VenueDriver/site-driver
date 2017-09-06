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
    data : any;
    private sub: any;

    constructor(private route: ActivatedRoute , private moleculeService : MoleculeService){}

    log(what){
      console.log(what);
    }

    ngOnInit() {
      this.sub = this.route.params.subscribe(params => {
         this.instanceID = params['id'];
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
           this.ready = true;
         });
      });
    }

    ngOnDestroy() {
      this.sub.unsubscribe();
    }

}
