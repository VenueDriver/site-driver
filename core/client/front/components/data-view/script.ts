import { Component , OnInit , Input} from '@angular/core';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'data-view',
  template: require('./template.html')
})

export class DataViewComponent implements OnInit {

  selectedItem : any;
  @Input() userRole : number = 0;

  constructor(private dataService : DataService){}

  ngOnInit(){
    this.selectedItem = this.dataService.selected();
    if(this.selectedItem._child.length >0){
      this.makeActive(this.selectedItem._child[0]);
    }
    console.log(this.selectedItem);
  }

  makeActive(section){
    for(let sec of this.selectedItem._child){
      sec._active_section = false;
    }
    section._active_section = true;
  }

}
