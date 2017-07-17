import { Component , OnInit } from '@angular/core';
import { PdService } from '../../services/pd.service';
import { Config } from '../../services/config.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'event-list',
  template: require('./template.html'),
  styles : [require('./styles.css')]
})

export class EventList implements OnInit {
  private ready : boolean;

  constructor(private PdService : PdService , private router: Router){
  }

  ngOnInit(){
    this.PdService.events().then((index)=> this.ready = true);
  }

  openEvent(event : any){
    this.router.navigate(['/event', event.id]);
  }
}
