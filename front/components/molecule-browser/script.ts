import { Component , Input , OnInit , Output, EventEmitter, ComponentRef, ChangeDetectorRef} from '@angular/core';
import { NgClass } from '@angular/common';
import { DataService } from '../../services/data.service';


@Component({
  selector: 'molecule-browser',
  template: require('./template.html'),
  styles : [require('./styles.css')]
})

export class MoleculeBrowserComponent implements OnInit {

  @Input() data ;
  @Output() valueChange = new EventEmitter();
  @Input() userRole : number;

  additional_classes : any = [];
  isDeveloper : boolean = false;
  errors : Array<any> = [];
  editing : boolean = false;
  ready : boolean = false;

  constructor(private ref: ChangeDetectorRef, private dataService : DataService){

  }

  parseAdditionalClasses(){
    if(this.data._options){
      if(this.data._options._additional_css_classes) this.additional_classes = this.data._options._additional_css_classes.split(',');
    }
  }

  ngOnInit(){
    console.log("Browser data:",this.data);
    this.parseAdditionalClasses();
    this.validate(this.data._value);
    this.dataService.userRole().then((data)=>{
      this.isDeveloper = (<any>data).role > 9000;
      this.ready = true;
    })
  }

  ngOnChanges(){
    this.parseAdditionalClasses();
  }

  emitValue(hierarchyTree){
    this.valueChange.emit(hierarchyTree);
    this.data._value = hierarchyTree;
    this.ref.detectChanges();
  }

  validate(value){
    return new Promise((resolve,reject)=>{
      this.errors = [];
      resolve(true);
    })
  }

  log(x){
    console.log(x);
  }

}
