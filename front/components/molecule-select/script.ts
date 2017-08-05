import { Component , Input , OnInit , Output, EventEmitter} from '@angular/core';
import { MoleculeService } from '../../services/molecule.service';

@Component({
  selector: 'molecule-select',
  template: require('./template.html'),
  styles : [require('./styles.css')]
})

export class MoleculeSelect implements OnInit {

  typesList : any;
  ready : boolean = false;
  @Input() activeTypes : any = false;
  @Input() max : number = 1;
  @Output() valueChange = new EventEmitter();

  constructor(private moleculeService : MoleculeService){

  }

  emitValue(item){
    if(this.max > 1 || this.max < 1){
      item.checked = !item.checked;
      this.valueChange.emit(this.typesList.filter(el=>el.checked));
    }else{
      this.valueChange.emit([item]);
    }
  }

  formatItems(item){
    return `${item._type}`;
  }


  ngOnInit(){
    this.moleculeService.getAllMolecules().then((list)=>{
      this.ready = true;
      this.typesList = list;
    }).catch((err)=>{
      console.log(err);
    })
  }

}
