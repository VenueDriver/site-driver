import { Component , OnInit } from '@angular/core';
import { PdService } from '../../services/pd.service';
import { ActivatedRoute , Params } from '@angular/router';
import { Location } from '@angular/common';
import { WindowRef  } from '../../helpers/window-ref';

@Component({
  selector: 'event-detail',
  template: require('./template.html'),
  styles : [require('./styles.css')]
})

export class EventDetail implements OnInit {
  private event : any;
  constructor(
    private PdService : PdService ,
    private WindowRef : WindowRef ,
    private route : ActivatedRoute,
    private location : Location
  ){
    this.event = {};
  }

  ngOnInit(){
    this.route.params.forEach( (params : Params) =>{
      let id = +params['id'];
      this.PdService.event(id).then( ev => this.event = ev );
    })
  }

}
