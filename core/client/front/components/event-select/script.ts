import { Component , Input , OnInit , Output, EventEmitter } from '@angular/core';
import { DatePipe } from '@angular/common';
import { TruncatePipe } from '../../pipes/truncate';
import { PdService } from '../../services/pd.service';

@Component({
  selector: 'event-select',
  template: require('./template.html')
})

export class EventSelectComponent implements OnInit {

  @Output() valueChange  = new EventEmitter();
  @Output() listReady = new EventEmitter();
  @Input()  filter : any = [] ;
  @Input()  disabled : boolean = false;
  @Input()  currentValue : any = false;
  value : any;
  timeoutHolder : any;
  events : any;
  ready : boolean = false;

  constructor(private PdService : PdService){

  }

  emitValue(value){
    this.valueChange.emit(value);
  }

  formatItems(item : any){
    let date = new DatePipe('en-US').transform(item.date, "MMM dd y").toUpperCase();
    let title = new TruncatePipe().transform(item.title,35);
    return `<span class="event-autocomplete-item"><span class="item-date">${date}</span> <b class="auto-complete-event">${title}</b> - <span class="event-friendly-id">${item.get_friendly_id}</span></span>`;
  }

  formatSelection(item : any){
    let date = new DatePipe('en-US').transform(item.date, "MMM dd y").toUpperCase();
    let title = new TruncatePipe().transform(item.title,35);
    return `[${date}] ${title} - ${item.get_friendly_id}`;
  }

  loadEvents(){
    this.ready = false;
    clearTimeout(this.timeoutHolder);
      this.timeoutHolder = setTimeout(()=>{
        this.PdService.events({loadAll:true}).then( index => {
          this.PdService.events(this.filter).then( index => {
            console.log(this.filter,(<any>index).events.length);
            this.events = (<any>index).events;
            this.ready = true;
          })
        });
      }
    ,300)
  }

  ngOnInit(){
    if(this.currentValue){
      this.value = this.currentValue;
    }
    this.loadEvents();
  }

  ngOnChanges(changes){
    this.loadEvents();
  }

}
