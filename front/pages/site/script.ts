import { Component , OnInit } from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'site-page',
  template: require('./template.html')
})

export class SitePage implements OnInit {
  title : string = "Site";
  private sub: any;
  domain : any;
  ready : boolean = false;
  site : any;
  panel : boolean = false;
  userRole : number = 0;


  constructor(private route: ActivatedRoute , private dataService : DataService) {}


  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
       this.domain = params['domain'];
       this.dataService.select("site",this.domain).then((site)=>{
         this.site = site;
         this.ready = true;
         this.dataService.userRole().then((data : any)=>{
           this.userRole = data.role;
         })
       });
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  openPanel(){
    this.panel = true;
  }

  closePanel(){
    this.panel = false;
  }

  togglePanel(){
    this.panel = !this.panel;
  }

  grabFiles(files){
    this.site._icon = files[0].src;
    this.closePanel();
  }

}
