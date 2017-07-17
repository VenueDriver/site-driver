import { Component , Input , OnInit , Output, EventEmitter} from '@angular/core';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'type-list',
  template: require('./template.html'),
  styles : [require('./styles.css')]
})

export class TypeListComponent implements OnInit {

  types : any;
  ready : boolean = false;
  @Input() activeTypes : any = false;
  @Output() listChange = new EventEmitter();

  constructor(private dataService : DataService){

  }

  toggleItem(item){
    item.checked = !item.checked;
    this.listChange.emit(this.types.filter(el=>el.checked).map(el=> el.val));
  }


  ngOnInit(){
    this.types = this.dataService.availableTypes.map(el=>{
      let isActive = (this.activeTypes) ? this.activeTypes.indexOf(el)>-1 : false;
      return {val : el , checked : isActive};
    });
    this.ready = true;
  }

}
