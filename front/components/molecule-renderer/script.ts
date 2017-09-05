import {
    Component,
    Input,
    Output,
    EventEmitter,
    ViewChild,
    ComponentRef,
    ComponentFactoryResolver,
    Compiler,
    ViewContainerRef,
    Type,
    ChangeDetectorRef
  } from '@angular/core';

// Helper component to add dynamic components
@Component({
  selector: 'molecule-renderer',
  template: `<div #target></div>`
})

export class MoleculeRenderer {
  @ViewChild('target', {read: ViewContainerRef}) target: ViewContainerRef;
  cmpRef: ComponentRef<Component>;
  @Input() component : any;
  @Input() options : any;
  @Input() data : any;
  @Output() valueChange = new EventEmitter();
  private isViewInitialized:boolean = false;

  constructor(private componentFactoryResolver: ComponentFactoryResolver, private compiler: Compiler , private ref: ChangeDetectorRef) {}

  updateComponent() {
    if(!this.isViewInitialized) {
      return;
    }
    if(this.cmpRef) {
      // when the `type` input changes we destroy a previously
      // created component before creating the new one
      this.cmpRef.destroy();
    }

    if(this.component){
      // console.log(this.data);
      let factory = this.componentFactoryResolver.resolveComponentFactory(this.component);
      this.cmpRef = this.target.createComponent(factory);
      // to access the created instance use
      // console.log((<any>this.cmpRef.instance));
      if(this.data){
        (<any>this.cmpRef.instance).data = this.data;
      }

      if((<any>this.cmpRef.instance).valueChange && this.valueChange){
        (<any>this.cmpRef.instance).valueChange = this.valueChange;
      }
      if(this.options){
        for(let key in this.options){
          (<any>this.cmpRef.instance)[key] = this.options[key];
        }
      }
    }

    this.ref.detectChanges();
    // this.cmpRef.instance.someOutput.subscribe(val => doSomething());
  }

  ngOnChanges() {
    this.updateComponent();
  }

  ngAfterViewInit() {
    this.isViewInitialized = true;
    this.updateComponent();
  }

  ngOnDestroy() {
    if(this.cmpRef) {
      this.cmpRef.destroy();
    }
  }
}
