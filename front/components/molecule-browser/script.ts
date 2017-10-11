import { Component , Input , OnInit , Output, EventEmitter} from '@angular/core';


@Component({
  selector: 'molecule-browser',
  template: require('./template.html'),
  styles : [require('./styles.css')]
})

export class MoleculeBrowserComponent {

  @Input() data : any;
  @Output() valueChange = new EventEmitter();

  constructor(){

  }

  emitValue(hierarchyTree){
    this.valueChange.emit(hierarchyTree);
    this.data._value = hierarchyTree;
  }

}
