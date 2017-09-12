import { Component , OnInit} from '@angular/core';
import { DataService } from '../../services/data.service';
import { MoleculeService } from '../../services/molecule.service';

@Component({
  selector: 'page-header',
  template: require('./template.html')
})

export class PageHeader implements OnInit {

  open : boolean = false;
  ready : boolean = false;
  cache : any ;
  isDeveloper : boolean = false;
  generators : Array<any>;

  constructor( private dataService : DataService , private moleculeService : MoleculeService){}

  ngOnInit(){
    console.log("PAGE HEADER CACHE:",this.cache,"Doesn't have one?",(!this.cache));
    this.dataService.userRole().then((data : any)=>{
      this.isDeveloper = (<any>data).role > 9000;
      if(!this.cache){
        this.moleculeService.getMoleculeList({type : ['generator']}).then((cache)=>{
          this.cache = cache;
          this.generators = cache.data;
          this.ready = true;
        })
      }
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
