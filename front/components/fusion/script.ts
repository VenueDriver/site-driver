import { Component , Input , OnInit } from '@angular/core';
import { MoleculeService } from '../../services/molecule.service';
import { TextInterface } from '../../../models/interfaces';


@Component({
  selector: 'fusion',
  template: require('./template.html'),
  styles : [require('./styles.css')],
  //encapsulation: ViewEncapsulation.None
})

export class FusionComponent {

  @Input() node : any;

  insert(){
    let testNode : TextInterface = {
      _id : '',
      _name : 'Sarasa Test',
      _type : 'Text',
      _path : [],
      _value : 'Test Value',
      _ngComponent : null,
      _can : {
        _edit : true,
        _show : true,
        _dragg : true,
        _delete : true,
        _edit_value : true
      },
      _options : {
        _use_textarea : false
      }
    }
    this.node.push(testNode);
  }

}
