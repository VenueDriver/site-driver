import { Component , Input , OnInit , Output, EventEmitter} from '@angular/core';
import { MoleculeService } from '../../services/molecule.service';

@Component({
  selector: 'molecule-hierarchy-tree',
  template: require('./template.html'),
  styles : [require('./styles.css')]
})

export class MoleculeHierarchyTreeComponent implements OnInit {

  typesList : any;
  ready : boolean = false;

  constructor(private moleculeService : MoleculeService){

  }

  ngOnInit(){
    this.moleculeService.getAllMolecules().then((list)=>{
      console.log("Hierarchy tree list",list);
      this.typesList = list;
    }).catch((err)=>{
      console.log(err);
    })
  }

}
