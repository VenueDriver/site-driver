import { Component , OnInit } from '@angular/core';
import { ActivatedRoute , Router } from '@angular/router';
import { MoleculeGeneratorInterface } from '../../../definitions/interfaces';
import { MoleculeService } from '../../services/molecule.service';

@Component({
  selector: 'molecule-generator-page',
  template: require('./template.html'),
  styles : [`
    table{ width: 100% }
    tr {
      background:#fff;
      border: 1px solid #ccc;
    }
    td {
      padding:10px;
    }
    thead td{
      font-weight:bold;
    }
    `]
})

export class MoleculeGenerator implements OnInit {

  ngOnInit(){
    
  }

}
