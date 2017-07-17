import { Component , OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';


@Component({
  selector: 'index-page',
  template: require('./template.html')
})

export class IndexPage {
  title : string = "Index";
  userRole : number;

  constructor(private dataService : DataService){}

  testLog(log){
    console.log(log);
  }

  ngOnInit() {
    this.dataService.userRole().then((data : any)=>{
      this.userRole = data.role;
    })
  }

}
