import { Component , Input , OnInit , Output, EventEmitter} from '@angular/core';


@Component({
  selector: 'molecule-browser',
  template: require('./template.html'),
  styles : [require('./styles.css')]
})

export class MoleculeBrowserComponent {

  @Output() valueChange = new EventEmitter();

  constructor(){

  }

  emitValue(tree){
    console.log("tree changed",tree);
    this.valueChange.emit(tree);
  }

}
