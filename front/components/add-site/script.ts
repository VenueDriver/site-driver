import { Component , Input , OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../../services/data.service';



@Component({
  selector: 'add-site',
  template: require('./template.html'),
  styles : [require('./styles.css')],
  //encapsulation: ViewEncapsulation.None
})

export class AddSiteComponent implements OnInit {

  name   : string = '';
  domain : string = '';
  icon   : string = '';
  sites  : any;
  panel  : boolean = false;
  s3panel : boolean = false;
  baseSite : any;
  ready  : boolean = false;
  savingData : boolean = false;

  constructor(private dataService : DataService , private router: Router){}
  ngOnInit(){
    this.dataService.getSitesList().then((list)=>{
      this.sites = list;
      this.ready = true;
    });
  }

  showPanel(){
    this.panel = true;
  }

  hidePanel(){
    this.panel = false;
  }

  save(){
    if(!this.savingData){
      this.savingData = true;
      this.validate().then((errors : any)=>{
        if(errors.length < 1){
          let newSite = {
            _domain: this.domain,
            _name : this.name,
            _icon : this.icon,
            _child : [],
            _isNewSite : true
          };
          if(this.baseSite){
            newSite._child = this.baseSite._child
          }
          this.dataService.newSite(newSite,(data)=>{
            if(data.hasOwnProperty("error")){
              this.savingData = false;
              alert(data.error.join('\n'));
              console.log(data);
            }else{
              this.savingData = false;
              this.hidePanel();
              this.router.navigate(['site', this.domain]);
            }
          });
        }else{
          this.savingData = false;
          alert(errors.join('\n'));
        }
      })
    }
  }

  formatSelection(item : any){
    return `${item._domain}`;
  }

  s3openPanel(){
    this.s3panel = true;
  }

  s3closePanel(){
    this.s3panel = false;
  }

  s3togglePanel(){
    this.s3panel = !this.s3panel;
  }

  s3grabFiles(files){
    this.icon = files[0].src;
    this.s3closePanel();
  }

  validate(){
    return new Promise((resolve,reject)=>{
      let errors : Array<any> = [];
      let siteExists = false;
      (<any>this.sites).forEach((el)=>{
        if(el._domain === this.domain) siteExists = true;
      });
      if(siteExists){
        errors.push("Domain name already exists.")
      }
      if(this.domain.length < 3){
        errors.push("Invalid domain provided.")
      }
      resolve(errors);
    })
  }

  testlog(log){ console.log(log) }

}
