import { Component , OnInit } from '@angular/core';
import { PdService } from '../../services/pd.service';
import { Config } from '../../services/config.service';

@Component({
  selector: 'event-filter',
  template: require('./template.html'),
  styles : [require('./styles.css')]
})

export class EventFilter implements OnInit {
  artists :any;
  venues : any;
  active : any;
  filterList : any;



  constructor(private PdService : PdService , private siteConfig : Config){
    this.venues = [];
    this.artists = [];
    this.active = {artist:[],venue:[]};
    this.filterList = {venue:[],artist:[]};
  }

  toggle(type,data,i){
    this.active[type][i]=!this.active[type][i];
    if(this.active[type][i]){
      this.filterList[type].push(data.id);
    }else{
      this.filterList[type].splice(this.filterList[type].indexOf(data.id),1);
    }
    this.PdService.events({venues : this.filterList.venue, artists : this.filterList.artist});
  }

  ngOnInit(){
    this.PdService.artists().then(artists => this.artists = artists );
    this.PdService.venues(this.siteConfig.get().data.venues).then(venues => this.venues = venues );
  }

}
