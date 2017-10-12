import { Component , Input , OnInit , Output, EventEmitter, ComponentRef, ChangeDetectorRef} from '@angular/core';


@Component({
  selector: 'molecule-browser',
  template: require('./template.html'),
  styles : [require('./styles.css')]
})

export class MoleculeBrowserComponent {

  @Input() data ;
  @Output() valueChange = new EventEmitter();

  constructor(private ref: ChangeDetectorRef){

  }

  emitValue(hierarchyTree){
    this.valueChange.emit(hierarchyTree);
    this.data._value = hierarchyTree;
    this.ref.detectChanges();
  }

}
