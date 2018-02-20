import { Component } from '@angular/core';
import { DataService } from '../../services/data.service';



@Component({
  selector: 'save-btn',
  template: require('./template.html'),
  styles : [require('./styles.css')],
  //encapsulation: ViewEncapsulation.None
})

export class SaveButtonComponent {

  saving : boolean = false;

  constructor(private dataService : DataService){}

  save(){
    this.saving = true;
    this.dataService.save(null,(data)=>{
      this.saving = false;
      if(data.hasOwnProperty("error")){
        alert(data.error.join('\n'));
        console.log(data);
      }else{
        alert("Site updated");
      }
    });
  }

}
