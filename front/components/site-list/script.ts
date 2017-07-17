import { Component , Input , OnInit , Output, EventEmitter} from '@angular/core';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'site-list',
  template: `<ng-content *ngIf="ready"></ng-content>`,
  styles : [require('./styles.css')]
})

export class SiteListComponent implements OnInit {

  sites : any;
  ready : boolean = false;

  constructor( private dataService : DataService ){}

  ngOnInit(){
    this.dataService.getSitesList().then((sites)=>{
      this.sites = sites;
      this.ready = true;
    });
  }

}
