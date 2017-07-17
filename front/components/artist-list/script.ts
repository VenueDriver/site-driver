import { Component , Input , OnInit , Output, EventEmitter} from '@angular/core';
import { PdService } from '../../services/pd.service';

@Component({
  selector: 'artist-list',
  template: require('./template.html'),
  styles : [require('./styles.css')]
})

export class ArtistListComponent {

  artists : any;
  ready : boolean = false;
  @Input() activeItems : any = false;
  @Output() listChange = new EventEmitter();

  constructor(private PdService : PdService){

  }

  toggleItem(item){
    item.checked = !item.checked;
    this.listChange.emit(this.artists.filter(el=>el.checked));
  }


  ngOnInit(){
    this.PdService.artists().then( artists => {
      this.artists = (<Array<any>>artists).map(el=>{
        let isActive = (this.activeItems) ? this.activeItems.indexOf(el.id)>-1 : false;
        el.checked = isActive;
        return el;
      });
      this.ready = true;
    });
  }

}
