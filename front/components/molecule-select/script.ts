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
    const newIdentity = (molecule)=>{
      molecule._id = '';
      if(molecule._ngClass !== "MoleculeGenerator" && Array.isArray(molecule._value)){
        molecule._value = molecule._value.map(newIdentity);
      }
      return Object.assign({},molecule);
    }
    if(item){
      item._instance_of = Object.assign({},item)._id;
      if(this.max > 1 || this.max < 1){
        item.checked = !item.checked;
        let returnList = this.typesList.filter(el=>el.checked);
        returnList = returnList.map(newIdentity);
        this.valueChange.emit(returnList);
      }else{
        console.log(newIdentity(item));
        this.valueChange.emit([newIdentity(item)]);
      }
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
