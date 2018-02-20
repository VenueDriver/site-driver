"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
// Helper component to add dynamic components
var MoleculeRenderer = (function () {
    function MoleculeRenderer(componentFactoryResolver, compiler, ref) {
        this.componentFactoryResolver = componentFactoryResolver;
        this.compiler = compiler;
        this.ref = ref;
        this.valueChange = new core_1.EventEmitter();
        this.isViewInitialized = false;
    }
    MoleculeRenderer.prototype.updateComponent = function () {
        if (!this.isViewInitialized) {
            return;
        }
        if (this.cmpRef) {
            // when the `type` input changes we destroy a previously
            // created component before creating the new one
            this.cmpRef.destroy();
        }
        if (this.component) {
            // console.log(this.data);
            var factory = this.componentFactoryResolver.resolveComponentFactory(this.component);
            this.cmpRef = this.target.createComponent(factory);
            // to access the created instance use
            // console.log((<any>this.cmpRef.instance));
            if (this.data) {
                this.cmpRef.instance.data = this.data;
            }
            if (this.cmpRef.instance.valueChange && this.valueChange) {
                this.cmpRef.instance.valueChange = this.valueChange;
            }
            if (this.options) {
                for (var key in this.options) {
                    this.cmpRef.instance[key] = this.options[key];
                }
            }
        }
        this.ref.detectChanges();
        // this.cmpRef.instance.someOutput.subscribe(val => doSomething());
    };
    MoleculeRenderer.prototype.ngOnChanges = function () {
        this.updateComponent();
    };
    MoleculeRenderer.prototype.ngAfterViewInit = function () {
        this.isViewInitialized = true;
        this.updateComponent();
    };
    MoleculeRenderer.prototype.ngOnDestroy = function () {
        if (this.cmpRef) {
            this.cmpRef.destroy();
        }
    };
    __decorate([
        core_1.ViewChild('target', { read: core_1.ViewContainerRef }), 
        __metadata('design:type', core_1.ViewContainerRef)
    ], MoleculeRenderer.prototype, "target", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], MoleculeRenderer.prototype, "component", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], MoleculeRenderer.prototype, "options", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], MoleculeRenderer.prototype, "data", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], MoleculeRenderer.prototype, "valueChange", void 0);
    MoleculeRenderer = __decorate([
        core_1.Component({
            selector: 'molecule-renderer',
            template: "<div #target></div>"
        }), 
        __metadata('design:paramtypes', [core_1.ComponentFactoryResolver, core_1.Compiler, core_1.ChangeDetectorRef])
    ], MoleculeRenderer);
    return MoleculeRenderer;
}());
exports.MoleculeRenderer = MoleculeRenderer;
//# sourceMappingURL=script.js.map