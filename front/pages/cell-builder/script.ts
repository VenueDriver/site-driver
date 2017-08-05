import { Component , OnInit } from '@angular/core';
import { ActivatedRoute , Router } from '@angular/router';
import { CellInterface } from '../../../definitions/interfaces';
import { MoleculeService } from '../../services/molecule.service';

@Component({
  selector: 'cell-builder-page',
  template: require('./template.html'),
  styles : [`
    table{ width: 100% }
    tr {
      background:#fff;
      border: 1px solid #ccc;
    }
    td {
      padding:10px;
    }
    thead td{
      font-weight:bold;
    }
    `]
})

export class CellBuilder implements OnInit {
  title : string = "Cell Builder";
  ready : boolean = false;
  userRole : number = 0;
  name : string;
  savingData = false;

  cellList : Array<CellInterface>;
  editingList : any = {};


  constructor(private route: ActivatedRoute , private moleculeService : MoleculeService, private router: Router) {}

  ngOnInit() {
    this.updateCellList();
  }

  updateCellList(){
    return new Promise((resolve,reject)=>{
      this.moleculeService.getCellList().then((list)=>{
        this.cellList = list;
        this.ready = true;
        resolve(this.cellList);
      }).catch((err)=>{
        console.log("Cell List error",err);
        reject(err);
      });
    })
  }

  saveCell(cell : CellInterface){
    this.savingData = true;
    this.moleculeService.saveCell(cell).then((data)=>{
      this.updateCellList().then(()=>{
        this.savingData = false;
      })
    });
  }

  createCell(){
    let newCell = this.moleculeService.createCell(this.name);
    this.saveCell(newCell);
  }


  edit(cell : CellInterface){
    console.log("Edit",cell);
    if(this.editingList[cell._id]){
      this.editingList[cell._id] = false;
    }else{
      this.editingList[cell._id] = true;
    }
  }

  remove(cell : CellInterface){
    let accept = confirm("Are you sure you want to remove this element?"+cell._type);
    if(accept){
      return new Promise((resolve,reject)=>{
        this.moleculeService.removeCell(cell).then((success)=>{
          resolve(success);
          this.updateCellList();
        }).catch((err)=>{
          console.log("Cell List error",err);
          reject(err);
        });
      })
    }
  }

}
