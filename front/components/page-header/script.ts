import { Component , OnInit} from '@angular/core';
import { DataService } from '../../services/data.service';
import { MoleculeService } from '../../services/molecule.service';

@Component({
  selector: 'page-header',
  template: require('./template.html')
})

export class PageHeader implements OnInit {

  open : boolean = false;
  userRole : number;
  generators : Array<any>;

  constructor( private dataService : DataService , private moleculeService : MoleculeService){}

  ngOnInit(){
    this.dataService.userRole().then((data : any)=>{
      this.userRole = data.role;
      this.moleculeService.getMoleculeList({type : 'generator'}).then((list)=>{
        this.generators = list;
      })
    });
  }

  openNav(){
    this.open = true;
  }

  closeNav(){
    this.open = false;
  }

  toggleNav(){
    this.open = !this.open;
  }

}
