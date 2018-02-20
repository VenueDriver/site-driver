import { Component , Input , OnInit , Output , EventEmitter } from '@angular/core';
import { KeysPipe }   from '../../pipes/keys';
import { S3Service }  from '../../services/s3.service';

const asyncLoop = (condition,work,end)=>{
  if ( condition() ){ end() }else{ work(()=>asyncLoop(condition,work,end),end)}
}


@Component({
  selector: 's3-file-picker',
  template: require('./template.html'),
  styles : [require('./styles.css')]
  //encapsulation: ViewEncapsulation.None
})

export class S3FilePicker implements OnInit {

  panel   : boolean = false;
  loading : boolean = true;
  dir     : any = { _files : [] };
  path    : Array<string> = [ "/" ];
  current : any;
  newFolderName : string;
  newFolderInput : boolean = false;
  mobileFolders : boolean = false;
  @Output() fileSelected = new EventEmitter();
  @Output() close = new EventEmitter();
  @Input() accept : Array<string> = [];
  @Input() maxfiles : number = 1;

  constructor(private s3 : S3Service){
    this.current = this.dir;
  }

  ngOnInit(){
    this.openFolder().then(()=>{
      console.log("current",this.current);
    });
  }



  openFolder(name : any = false){
    this.mobileHideFolders();
    return new Promise((resolve,reject)=>{


      this.loading = true;
      if(name) this.path.push(name);
      this.current = (name) ? this.current[name] : this.current;

      this.s3.folder(this.path.join('')).then((folder)=>{
        this.current._files = [];
        (<any>folder).forEach((item)=>{
          item = (<any>item);

          if (/\.\w+$/.test(item)){
            let extension = item.match(/\.\w+$/)[0];
            let acceptedFormat = true;
            if(this.accept.length > 0){
              acceptedFormat = this.accept.indexOf(extension)>-1;
            }
            if(acceptedFormat){
              this.current._files.push({
                path : this.path.join('')+item,
                src : "//s3-us-west-1.amazonaws.com/assets.portaldriver.com"+this.path.join('')+item,
                ext : extension,
                isImage : ([".jpg",".jpeg",".png",".gif",".bmp",".svg"].indexOf(extension) > -1),
                name : item,
                selected : false
              });
            }
          }else if(/\/$/.test(item)){
            if(item !== "_files"){
              this.current[item] = { _files : [] };
            }
          }

        })

        this.loading = false;
        resolve(this.path);
      })


    });
  }

  refresh(){
    return this.openFolder();
  }

  goToFolder(index){
    this.path = this.path.filter((el,i)=> i <= index );
    return this.refresh();
  }

  selected(){
    return this.current._files.filter(el=>el.selected);
  }

  unselectAll(){
    this.current._files.map(file =>{
      file.selected = false;
      return file;
    })
  }

  selectAll(){
    this.current._files.map(file =>{
      file.selected = true;
      return file;
    })
  }

  selectFile(file){
    if(!file.selected){
      if(this.selected().length < this.maxfiles ){
        file.selected = !file.selected;
      }else if(this.maxfiles === 1){
        this.unselectAll();
        file.selected = !file.selected;
      }
    }else{
      file.selected = !file.selected;
    }
  }

  save(){
    this.fileSelected.emit(this.selected());
  }

  cancel(){
    this.close.emit(true);
  }


  fileChange(event) {
    let fileList: FileList = event.target.files;
    this.loading = true;
    let i = 0;
    asyncLoop(
      ()=> i >= fileList.length,
      (next,end)=>{
        let file: File = fileList[i];
        this.s3.create(this.path.join(''),file).then((data)=>{
          i++;
          next();
        });
      },
      ()=>{
        this.loading = false;
        this.refresh();
      }
    );
    this.loading = true;
  }

  sanitizeFolderName(name,i : number = 1){
    let clean = true;
    name = name.replace(/\s+/gi,"_");
    if(name==="_files") name = "files";
    Object.keys(this.current).forEach((folder)=>{
      if(folder !== "_files"){
        if(folder.replace(/\/$/,'') === name){
           clean = false;
           name = name.replace(/\(\d+\)$/,'');
           name = name+"("+i+")";
        };
        if(!clean){
          name = this.sanitizeFolderName(name,i+1);
        }
      }
    });
    return name;
  }


  newFolder(){
    this.loading = true;
    this.s3.create(this.path.join('')+this.sanitizeFolderName(this.newFolderName)).then((err)=>{
      this.newFolderName = "";
      this.loading = false;
      this.resetFolderInput();
      this.refresh();
    })
  }

  resetFolderInput(){
    this.newFolderInput = false;
    this.newFolderName = '';
  }

  // DELETE FILES
  deleteSelected(){
    let confirmDelete = confirm("Are you sure you want to delete the selected files?");
    if(confirmDelete){
      this.loading = true;
      let i = 0;
      asyncLoop(
        ()=> i >= this.selected().length,
        (next,end)=>{
          this.s3.delete(
            this.selected()[i].path
          ).then(()=>{
            i++;
            next();
          });
        },
        ()=>{
          this.loading = false;
          this.refresh();
        }
      );
    }
  }

  mobileShowFolders(){
    this.mobileFolders = true;
  }

  mobileHideFolders(){
    this.mobileFolders = false;
  }

  mobileToggleFolders(){
    this.mobileFolders = !this.mobileFolders;
  }

}
