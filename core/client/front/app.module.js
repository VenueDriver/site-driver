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
var platform_browser_1 = require('@angular/platform-browser');
var http_1 = require('@angular/http');
var router_1 = require('@angular/router');
var forms_1 = require('@angular/forms');
var common_1 = require('@angular/common');
var common_2 = require('@angular/common');
// THIRD PARTY
var auto_complete_1 = require('@ngui/auto-complete');
var mydatepicker_1 = require('mydatepicker');
var angular2_color_picker_1 = require('angular2-color-picker');
var angular2_image_upload_1 = require('angular2-image-upload');
var ng2_uploader_1 = require('ng2-uploader');
var ng2_dragula_1 = require('ng2-dragula');
var ng2_ckeditor_1 = require('ng2-ckeditor');
// CUSTOM COMPONENTS
var root_component_1 = require('./root.component');
var script_1 = require('./components/mutation/script');
var script_2 = require('./components/checkbox/script');
var script_3 = require('./components/group/script');
var script_4 = require('./components/cell/script');
var script_5 = require('./components/list/script');
var script_6 = require('./components/data-view/script');
var script_7 = require('./components/page/script');
var script_8 = require('./components/text/script');
var script_9 = require('./components/file/script');
var script_10 = require('./components/number/script');
var script_11 = require('./components/boolean/script');
var script_12 = require('./components/color/script');
var script_13 = require('./components/date/script');
var script_14 = require('./components/child/script');
var script_15 = require('./components/generator/script');
var script_16 = require('./components/modal/script');
var script_17 = require('./components/delete-btn/script');
var script_18 = require('./components/save-btn/script');
var script_19 = require('./components/col/script');
var script_20 = require('./components/row/script');
var script_21 = require('./components/artist/script');
var script_22 = require('./components/artist-select/script');
var script_23 = require('./components/venue-select/script');
var script_24 = require('./components/event-select/script');
var script_25 = require('./components/artist-list/script');
var script_26 = require('./components/venue/script');
var script_27 = require('./components/venue-list/script');
var script_28 = require('./components/event/script');
var script_29 = require('./components/type-list/script');
var script_30 = require('./components/site-list/script');
var script_31 = require('./components/image-field/script');
var script_32 = require('./components/spinner/script');
var script_33 = require('./components/add-site/script');
var script_34 = require('./components/slide/script');
var script_35 = require('./components/slider/script');
var script_36 = require('./components/s3-file-picker/script');
var script_37 = require('./components/link-field/script');
// MOLECULE
var script_38 = require('./components/molecule-create/script');
var script_39 = require('./components/molecule-select/script');
var script_40 = require('./components/molecule-save/script');
var script_41 = require('./components/molecule-remove/script');
var script_42 = require('./components/molecule-generator/script');
var script_43 = require('./components/molecule-hierarchy-tree/script');
var script_44 = require('./components/molecule-hierarchy-tree/molecule-hierarchy-tree-branch/script');
var script_45 = require('./components/molecule-browser/script');
var script_46 = require('./components/molecule-config/script');
var script_47 = require('./components/molecule-edit/script');
var script_48 = require('./components/molecule-renderer/script');
var script_49 = require('./components/fusion/script');
var script_50 = require('./components/table-renderer/script');
// GENERATOR LAYOUTS
var script_51 = require("./components/molecule-generator/layouts/cards-horizontal/script");
var script_52 = require("./components/molecule-generator/layouts/cards-vertical/script");
var script_53 = require("./components/molecule-generator/layouts/table/script");
var script_54 = require("./components/molecule-generator/layouts/sidebar/script");
// CUSTOM DIRECTIVES
var script_55 = require('./directives/fixed-element/script');
// CUSTOM SERVICES
var data_service_1 = require('./services/data.service');
var molecule_service_1 = require('./services/molecule.service');
var server_service_1 = require('./services/server.service');
var s3_service_1 = require('./services/s3.service');
var pd_service_1 = require('./services/pd.service');
var config_service_1 = require('./services/config.service');
// HELPERS
var window_ref_1 = require('./helpers/window-ref');
var truncate_1 = require('./pipes/truncate');
var safe_1 = require('./pipes/safe');
var userlabel_1 = require('./pipes/userlabel');
var keys_1 = require('./pipes/keys');
//PAGES
var script_56 = require('./components/page-header/script');
var script_57 = require('./components/page-footer/script');
var script_58 = require('./pages/site/script');
var script_59 = require('./pages/index/script');
var script_60 = require('./pages/cell-builder/script');
var script_61 = require('./pages/molecule-generator/script');
var script_62 = require('./pages/generator/script');
var script_63 = require('./pages/instance/script');
//DEFINE ROUTES
var appRoutes = require('./config/routes');
var AppModule = (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            imports: [
                platform_browser_1.BrowserModule,
                http_1.HttpModule,
                common_1.CommonModule,
                forms_1.FormsModule,
                mydatepicker_1.MyDatePickerModule,
                angular2_color_picker_1.ColorPickerModule,
                angular2_image_upload_1.ImageUploadModule.forRoot(),
                auto_complete_1.NguiAutoCompleteModule,
                ng2_uploader_1.Ng2UploaderModule,
                ng2_ckeditor_1.CKEditorModule,
                ng2_dragula_1.DragulaModule,
                router_1.RouterModule.forRoot(appRoutes)
            ],
            declarations: [
                script_19.ColumnComponent,
                script_55.FixedElementDirective,
                keys_1.KeysPipe,
                script_16.ModalComponent,
                script_39.MoleculeSelect,
                script_46.MoleculeConfig,
                script_32.Spinner,
                script_29.TypeListComponent,
                userlabel_1.UserLabelPipe,
                truncate_1.TruncatePipe,
                script_36.S3FilePicker,
                script_22.ArtistSelectComponent,
                script_23.VenueSelectComponent,
                script_24.EventSelectComponent,
                root_component_1.RootComponent,
                safe_1.SafePipe,
                script_9.FileNodeComponent,
                script_3.GroupComponent,
                script_4.CellComponent,
                script_8.TextNodeComponent,
                script_15.GeneratorComponent,
                script_14.ChildComponent,
                script_30.SiteListComponent,
                script_1.MutationWrapper,
                script_34.SlideFieldComponent,
                script_35.SliderFieldComponent,
                script_7.PageComponent,
                script_56.PageHeader,
                script_57.PageFooter,
                script_31.ImageFieldComponent,
                script_6.DataViewComponent,
                script_17.DeleteButtonComponent,
                script_18.SaveButtonComponent,
                script_20.RowComponent,
                script_10.NumberNodeComponent,
                script_11.BooleanNodeComponent,
                script_13.DateFieldComponent,
                script_12.ColorFieldComponent,
                script_21.ArtistFieldComponent,
                script_25.ArtistListComponent,
                script_26.VenueFieldComponent,
                script_27.VenueListComponent,
                script_28.EventFieldComponent,
                script_2.CheckboxComponent,
                script_5.ListFieldComponent,
                script_33.AddSiteComponent,
                script_37.LinkFieldComponent,
                script_59.IndexPage,
                script_62.GeneratorPage,
                script_58.SitePage,
                script_63.InstancePage,
                script_61.MoleculeGenerator,
                script_60.CellBuilder,
                script_48.MoleculeRenderer,
                script_40.MoleculeSave,
                script_47.MoleculeEdit,
                script_41.MoleculeRemove,
                script_38.MoleculeCreate,
                script_43.MoleculeHierarchyTreeComponent,
                script_44.MoleculeHierarchyTreeBranchComponent,
                script_49.FusionComponent,
                script_42.MoleculeGeneratorComponent,
                script_45.MoleculeBrowserComponent,
                script_50.TableRenderer,
                script_51.GeneratorLayoutHorizontalCards,
                script_52.GeneratorLayoutVerticalCards,
                script_53.GeneratorLayoutTable,
                script_54.GeneratorLayoutSidebar
            ],
            entryComponents: [
                script_3.GroupComponent,
                script_4.CellComponent,
                script_8.TextNodeComponent,
                script_20.RowComponent,
                script_34.SlideFieldComponent,
                script_35.SliderFieldComponent,
                script_37.LinkFieldComponent,
                script_31.ImageFieldComponent,
                script_9.FileNodeComponent,
                script_10.NumberNodeComponent,
                script_11.BooleanNodeComponent,
                script_13.DateFieldComponent,
                script_12.ColorFieldComponent,
                script_21.ArtistFieldComponent,
                script_26.VenueFieldComponent,
                script_28.EventFieldComponent,
                script_5.ListFieldComponent,
                script_19.ColumnComponent,
                script_39.MoleculeSelect,
                script_43.MoleculeHierarchyTreeComponent,
                script_42.MoleculeGeneratorComponent,
                script_45.MoleculeBrowserComponent,
                script_51.GeneratorLayoutHorizontalCards,
                script_52.GeneratorLayoutVerticalCards,
                script_53.GeneratorLayoutTable,
                script_54.GeneratorLayoutSidebar
            ],
            providers: [
                common_2.DatePipe,
                s3_service_1.S3Service,
                truncate_1.TruncatePipe,
                data_service_1.DataService,
                server_service_1.ServerService,
                molecule_service_1.MoleculeService,
                pd_service_1.PdService,
                config_service_1.Config,
                window_ref_1.WindowRef
            ],
            bootstrap: [root_component_1.RootComponent]
        }), 
        __metadata('design:paramtypes', [])
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map