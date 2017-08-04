import {
    Component,
    Input,
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
  @Input() data : any;
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

    let factory = this.componentFactoryResolver.resolveComponentFactory(this.data._ngComponent);
    this.cmpRef = this.target.createComponent(factory);
    // to access the created instance use
    (<any>this.cmpRef.instance).data = this.data;

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
