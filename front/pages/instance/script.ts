import { Component , OnInit } from '@angular/core';
import { ActivatedRoute , Router } from '@angular/router';
import { CellInterface } from '../../../definitions/interfaces';
import { MoleculeService } from '../../services/molecule.service';
import {Location} from '@angular/common';

@Component({
  selector: 'instance-page',
  template: require('./template.html'),
})

export class InstancePage implements OnInit {

    ready : boolean = false;
    instanceID : string;
    cache : any;
    cacheSecondary : any;
    instances : Array<any>;
    data : any;
    isGenerator : boolean = false;
    private sub: any;

    constructor(
      private route: ActivatedRoute ,
      private moleculeService : MoleculeService,
      private location : Location
    ){}

    log(what){
      console.log(what);
    }

    ngOnInit() {
      this.sub = this.route.params.subscribe(params => {
         this.instanceID = params['id'];
        //  console.log("PARAM ID:",params['id']);
        //  console.log("Instance ID",this.instanceID);
         this.moleculeService.getMoleculeList({
           type : ["instance"],
           id : this.instanceID,
           where : {
             _id : this.instanceID
           }
         }).then((firstCache)=>{
           console.log("main instance",firstCache);
            this.cacheSecondary = firstCache;
          //  console.log("Instance served",instance);
           this.data = firstCache.data[0];
           this.isGenerator = (this.data._ngClass === "MoleculeGenerator");

           if(this.isGenerator && !this.cache){
             this.moleculeService.getMoleculeList({
               type : ["instance"],
               name : this.data._options._molecule_types._value.map(value=>value._name),
               where : {
                 _generator : {
                   _name : this.data._name,
                   _id : this.data._id
                 }
              }
            }).then((mainCache)=>{
              console.log("main instance, childs",mainCache);
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

    goBack(ev){
      this.location.back();
    }

}
