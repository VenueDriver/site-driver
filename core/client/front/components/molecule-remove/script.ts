import { Component , Input , OnInit , Output, EventEmitter} from '@angular/core';
import { MoleculeService } from '../../services/molecule.service';
import { Location } from '@angular/common';


@Component({
  selector: 'molecule-remove',
  template: require('./template.html'),
  styles : [require('./styles.css')]
})

export class MoleculeRemove implements OnInit {

  @Input() molecule : any;
  @Input() type : string;
  @Output() afterRemove = new EventEmitter();

  bussy : boolean = false;

  constructor(
    private moleculeService : MoleculeService,
    private location : Location
  ){

  }

  ngOnInit(){

  }

  remove(){
    let confirmation = confirm("Are you sure you want to delete this "+this.molecule._name.replace(/\_/gi,' ')+"?");
    if(confirmation){
      this.bussy = true;
      this.moleculeService.removeMolecule(this.molecule).then((response)=>{
        this.afterRemove.emit(true);
        this.bussy = false;
        location.reload();
      });
    }
  }

}
