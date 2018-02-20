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
var MutationWrapper = (function () {
    function MutationWrapper(componentFactoryResolver, compiler, ref) {
        this.componentFactoryResolver = componentFactoryResolver;
        this.compiler = compiler;
        this.ref = ref;
        this.userRole = 0;
        this.isViewInitialized = false;
    }
    MutationWrapper.prototype.updateComponent = function () {
        if (!this.isViewInitialized) {
            return;
        }
        if (this.cmpRef) {
            // when the `type` input changes we destroy a previously
            // created component before creating the new one
            this.cmpRef.destroy();
        }
        var factory = this.componentFactoryResolver.resolveComponentFactory(this.data._typeComponent);
        this.cmpRef = this.target.createComponent(factory);
        // to access the created instance use
        this.cmpRef.instance.data = this.data;
        this.cmpRef.instance.userRole = this.userRole;
        this.ref.detectChanges();
        // this.cmpRef.instance.someOutput.subscribe(val => doSomething());
    };
    MutationWrapper.prototype.ngOnChanges = function () {
        this.updateComponent();
    };
    MutationWrapper.prototype.ngAfterViewInit = function () {
        this.isViewInitialized = true;
        this.updateComponent();
    };
    MutationWrapper.prototype.ngOnDestroy = function () {
        if (this.cmpRef) {
            this.cmpRef.destroy();
        }
    };
    __decorate([
        core_1.ViewChild('target', { read: core_1.ViewContainerRef }), 
        __metadata('design:type', core_1.ViewContainerRef)
    ], MutationWrapper.prototype, "target", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], MutationWrapper.prototype, "data", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], MutationWrapper.prototype, "userRole", void 0);
    MutationWrapper = __decorate([
        core_1.Component({
            selector: 'mutation',
            template: "<div #target></div>"
        }), 
        __metadata('design:paramtypes', [core_1.ComponentFactoryResolver, core_1.Compiler, core_1.ChangeDetectorRef])
    ], MutationWrapper);
    return MutationWrapper;
}());
exports.MutationWrapper = MutationWrapper;
//# sourceMappingURL=script.js.map