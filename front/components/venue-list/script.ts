import { Component , Input , OnInit , Output, EventEmitter} from '@angular/core';
import { PdService } from '../../services/pd.service';

@Component({
  selector: 'venue-list',
  template: require('./template.html'),
  styles : [require('./styles.css')]
})

export class VenueListComponent {

  venues : any;
  ready : boolean = false;
  @Input() activeItems : any = false;
  @Output() listChange = new EventEmitter();

  constructor(private PdService : PdService){

  }

  toggleItem(item){
    item.checked = !item.checked;
    this.listChange.emit(this.venues.filter(el=>el.checked));
  }


  ngOnInit(){
    this.PdService.venues().then( venues => {
      this.venues = (<Array<any>>venues).map(el=>{
        let isActive = (this.activeItems) ? this.activeItems.indexOf(el.id)>-1 : false;
        el.checked = isActive;
        return el;
      });
      this.ready = true;
    });
  }

}
