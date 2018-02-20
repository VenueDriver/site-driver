import { Component , Input , OnInit , Output, EventEmitter } from '@angular/core';
import { PdService } from '../../services/pd.service';

@Component({
  selector: 'artist-select',
  template: require('./template.html')
})

export class ArtistSelectComponent implements OnInit {

  @Output() valueChange  = new EventEmitter();
  @Output() listReady = new EventEmitter();
  @Input()  filter : any = [] ;
  @Input()  disabled : boolean = false;
  @Input()  currentValue : any = false;
  value : any;
  artists : any;
  ready : boolean = false;

  constructor(private PdService : PdService){

  }

  emitValue(value){
    this.valueChange.emit(value);
  }

  formatItems(item : any){
    return `(#${item.id}) ${item.name}`;
  }

  ngOnInit(){
    if(this.currentValue){
      this.value = this.currentValue;
    }
    this.PdService.artists().then( artists => {
      this.PdService.artists(this.filter).then( (artists) => {
        this.artists = artists;
        this.listReady.emit(true);
        this.ready = true;
      });
    });
  }

}
