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

  insert(){
    let testNode : TextInterface = {
      _id : '',
      _name : 'Sarasa Test',
      _type : 'Text',
      _ngClass : 'TextNode',
      _path : [],
      _value : 'Test Value',
      _can : {
        _be_required : false,
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
    this.node.insert(testNode);
  }

}
