import { Component , OnInit } from '@angular/core';
import { ActivatedRoute , Router } from '@angular/router';
import { MoleculeService } from '../../services/molecule.service';

@Component({
  selector: 'cell-builder-page',
  template: require('./template.html')
})

export class CellBuilder implements OnInit {
  title : string = "Cell Builder";
  private sub: any;
  domain : any;
  ready : boolean = false;
  site : any;
  panel : boolean = false;
  userRole : number = 0;
  name : string;
  savingData = false;


  constructor(private route: ActivatedRoute , private moleculeService : MoleculeService, private router: Router) {}

  ngOnInit() {
    this.ready = true;
  }

  saveCell(){
    this.savingData = true;
    this.moleculeService.saveCell({
      _name : this.name
    }).then((data)=>{
      this.savingData = false;
    });
  }

}
