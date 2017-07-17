import { Component , Input , OnInit , Output, EventEmitter } from '@angular/core';
import { PdService } from '../../services/pd.service';

@Component({
  selector: 'venue-select',
  template: require('./template.html')
})

export class VenueSelectComponent implements OnInit {

  @Output() valueChange  = new EventEmitter();
  @Output() listReady = new EventEmitter();
  @Input()  filter : any = [] ;
  @Input()  disabled : boolean = false;
  @Input()  currentValue : any = false;
  value : any;
  venues : any;
  ready : boolean = false;

  constructor(private PdService : PdService){

  }

  emitValue(value){
    this.valueChange.emit(value);
  }

  formatItems(item : any){
    return `(#${item.id}) ${item.title}`;
  }

  ngOnInit(){
    if(this.currentValue){
      this.value = this.currentValue;
    }
    this.PdService.venues().then( artists => {
      this.PdService.venues(this.filter).then( (venues) => {
        this.venues = venues;
        this.listReady.emit(true);
        this.ready = true;
      });
    });
  }

}
