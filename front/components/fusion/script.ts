import { Component , Input , OnInit } from '@angular/core';
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

  insert(){
    this.node.insert(this.nodeInsert);
  }

}
