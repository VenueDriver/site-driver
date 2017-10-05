import { Component , Input , OnInit , Output, EventEmitter} from '@angular/core';


@Component({
  selector: 'molecule-browser',
  template: require('./template.html'),
  styles : [require('./styles.css')]
})

export class MoleculeBrowserComponent implements OnInit {

  typesList : any;
  ready : boolean = false;
  @Input() activeTypes : any = false;
  @Input() max : number = 1;
  @Output() valueChange = new EventEmitter();
  @Input() useMolecules : Array<any>;

  useMoleculesParsed : Array<string>;

  constructor(){

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

  }

  ngOnInit(){
    this.update();
  }

  ngOnChanges(){
    this.update();
  }

}
