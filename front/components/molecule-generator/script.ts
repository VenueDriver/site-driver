import { Component , OnInit } from '@angular/core';
import { ActivatedRoute , Router } from '@angular/router';
import { MoleculeGeneratorInterface } from '../../../definitions/interfaces';
import { MoleculeService } from '../../services/molecule.service';

@Component({
  selector: 'molecule-generator',
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

export class MoleculeGeneratorComponent implements OnInit {
  title : string = "Molecule Generator";
  ready : boolean = false;
  userRole : number = 0;
  name : string;
  savingData = false;

  generatorList : Array<MoleculeGeneratorInterface>;
  editingList : any = {};

  selectedMolecules : Array<any>;
  layout : string;
  structure : string;
  use_only_childs : boolean = true;



  constructor(
    private route: ActivatedRoute ,
    private moleculeService : MoleculeService,
    private router: Router
  ) {}

  ngOnInit() {
    this.updateGeneratorList();
  }

  moleculeSelected(value){
    this.selectedMolecules = value;
  }

  emitValue(value){

  }

  updateGeneratorList(){
    return new Promise((resolve,reject)=>{
      this.moleculeService.getGeneratorList().then((list)=>{
        this.generatorList = list;
        this.ready = true;
        resolve(this.generatorList);
      }).catch((err)=>{
        console.log("Generator List error",err);
        reject(err);
      });
    })
  }

  saveGenerator(generator : MoleculeGeneratorInterface){
    this.savingData = true;
    this.moleculeService.saveGenerator(generator).then((data)=>{
      this.updateGeneratorList().then(()=>{
        this.savingData = false;
      })
    });
  }

  createGenerator(){
    let newGenerator = this.moleculeService.createGenerator(this.name);
    this.saveGenerator(newGenerator);
  }


  edit(generator : MoleculeGeneratorInterface){
    console.log("Edit",generator);
    if(this.editingList[generator._id]){
      this.editingList[generator._id] = false;
    }else{
      this.editingList[generator._id] = true;
    }
  }

  remove(generator : MoleculeGeneratorInterface){
    let accept = confirm("Are you sure you want to remove this element?"+generator._type);
    if(accept){
      return new Promise((resolve,reject)=>{
        this.moleculeService.removeGenerator(generator).then((success)=>{
          resolve(success);
          this.updateGeneratorList();
        }).catch((err)=>{
          console.log("Generator List error",err);
          reject(err);
        });
      })
    }
  }

}
