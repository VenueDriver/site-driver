import { Component , Input , OnInit ,Output ,EventEmitter } from '@angular/core';
import { MoleculeService } from '../../services/molecule.service';
import { TextInterface } from '../../../definitions/interfaces';


@Component({
  selector: 'fusion',
  template: require('./template.html'),
  styles : [require('./styles.css')],
  //encapsulation: ViewEncapsulation.None
})

export class FusionComponent {

  @Input() node : any;
  @Input() nodeInsert : any;
  @Output() afterInsert = new EventEmitter();

  insert(){
    this.node.insert(this.nodeInsert).then(()=>{
      console.log("Fusion complete\n",this.node);
    });
    this.afterInsert.emit(false);
  }

}
