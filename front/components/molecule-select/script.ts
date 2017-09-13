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
  @Input() useMolecules : Array<any>;

  useMoleculesParsed : Array<string>;

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
    return `${item._label || 'unnamed'}`;
  }

  update(){
    if(this.useMolecules){
      if(this.useMolecules.length > 0 && typeof this.useMolecules[0] !== "string"){
        this.useMoleculesParsed = this.useMolecules.map(molecule => molecule._name);
      }else{
        this.useMoleculesParsed = this.useMolecules;
      }
    }
    // console.log("USE THIS MOLECULES",this.useMoleculesParsed);
    return this.moleculeService.getAllMolecules().then((list)=>{
      if(this.useMolecules){
        // console.log(list);
        list = list.filter((el)=> this.useMoleculesParsed.indexOf(el._name) > -1)
      }
      this.ready = true;
      this.typesList = list;
      // console.log("Use Molecules:",this.useMolecules);
      if(this.typesList.length === 1){
        console.log("Selected this:",this.typesList[0]);
        this.emitValue(this.typesList[0]);
      }
      // console.log("Selected:",this.typesList[0]);
    }).catch((err)=>{
      console.log(err);
    })
  }

  ngOnInit(){
    this.update();
  }

  ngOnChanges(){
    this.update();
  }

}
