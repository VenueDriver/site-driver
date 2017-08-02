import { Component , OnInit} from '@angular/core';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'page-header',
  template: require('./template.html')
})

export class PageHeader implements OnInit {

  open : boolean = false;
  userRole : number;

  constructor( private dataService : DataService){}

  ngOnInit(){
    this.dataService.userRole().then((data : any)=>{
      this.userRole = data.role;
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
