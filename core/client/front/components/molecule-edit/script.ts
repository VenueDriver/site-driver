import { Component , Input , OnInit } from '@angular/core';



@Component({
  selector: 'molecule-edit',
  template: require('./template.html'),
  styles : [require('./styles.css')],
  //encapsulation: ViewEncapsulation.None
})

export class MoleculeEdit implements OnInit {

  @Input() molecule : any;

  constructor(){}

  ngOnInit(){}

}
