import { Component , OnInit } from '@angular/core';
import { ActivatedRoute , Router } from '@angular/router';
import { DataService } from '../../services/data.service';

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
  name : string = '';
  savingData = false;


  constructor(private route: ActivatedRoute , private dataService : DataService, private router: Router) {}

  ngOnInit() {
    this.ready = true;
  }

  createCell(){
    this.savingData = true;
    this.dataService.saveCell({}).then((data)=>{
      this.savingData = false;
      this.router.navigate(['cell-builder', name]);
    });
  }

}
