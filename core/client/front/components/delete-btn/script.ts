import { Component , Input } from '@angular/core';
import { Group , Text } from '../../../models/models';
import { DataService } from '../../services/data.service';



@Component({
  selector: 'delete-btn',
  template: require('./template.html'),
  styles : [require('./styles.css')],
  //encapsulation: ViewEncapsulation.None
})

export class DeleteButtonComponent {

  @Input() path : any;

  constructor(private dataService : DataService){}

  delete(){
    let confirmed = confirm("Are you sure you want to delete this element?");
    if(confirmed){
      this.dataService.destroy(this.path);
    }
  }

}
