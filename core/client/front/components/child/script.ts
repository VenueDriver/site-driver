import { Component , Input } from '@angular/core';

@Component({
  selector: 'child',
  template: require('./template.html')
})

export class ChildComponent {

  @Input() data : any;
  @Input() userRole : number = 0;
  testList : any = [
    [
      "lala1",
      "lala2",
      "lala3",
      "lala4",
    ],
    [
      "lala5",
      "lala6",
      "lala7",
      "lala8",
    ]
  ];

  constructor(){

  }

}
