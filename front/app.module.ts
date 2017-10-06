import { NgModule , APP_INITIALIZER } from '@angular/core';
import { BrowserModule }              from '@angular/platform-browser';
import { HttpModule }                 from '@angular/http'
import { RouterModule, Routes }       from '@angular/router';
import { FormsModule }                from '@angular/forms';
import { CommonModule }               from '@angular/common';
import { DatePipe }                   from '@angular/common';

// THIRD PARTY
import { NguiAutoCompleteModule } from '@ngui/auto-complete';
import { MyDatePickerModule }     from 'mydatepicker';
import { ColorPickerModule }      from 'angular2-color-picker';
import { ImageUploadModule }      from 'angular2-image-upload';
import { Ng2UploaderModule }      from 'ng2-uploader';
import { DragulaModule }          from 'ng2-dragula';
import { CKEditorModule }         from 'ng2-ckeditor';

// CUSTOM COMPONENTS
import { RootComponent }          from './root.component';
import { MutationWrapper }        from './components/mutation/script';
import { CheckboxComponent }      from './components/checkbox/script';
import { GroupComponent }         from './components/group/script';
import { CellComponent }          from './components/cell/script';
import { ListFieldComponent }     from './components/list/script';
import { DataViewComponent }      from './components/data-view/script';
import { PageComponent }          from './components/page/script';
import { TextNodeComponent }      from './components/text/script';
import { FileNodeComponent }      from './components/file/script';

import { NumberNodeComponent }    from './components/number/script';
import { BooleanNodeComponent }   from './components/boolean/script';
import { ColorFieldComponent }    from './components/color/script';
import { DateFieldComponent }     from './components/date/script';
import { ChildComponent }         from './components/child/script';
import { GeneratorComponent }     from './components/generator/script';

import { ModalComponent }         from './components/modal/script';
import { DeleteButtonComponent }  from './components/delete-btn/script';
import { SaveButtonComponent }    from './components/save-btn/script';
import { ColumnComponent }        from './components/col/script';
import { RowComponent }           from './components/row/script';
import { ArtistFieldComponent }   from './components/artist/script';

import { ArtistSelectComponent }  from './components/artist-select/script';
import { VenueSelectComponent }   from './components/venue-select/script';
import { EventSelectComponent }   from './components/event-select/script';

import { ArtistListComponent }    from './components/artist-list/script';
import { VenueFieldComponent }    from './components/venue/script';
import { VenueListComponent }     from './components/venue-list/script';
import { EventFieldComponent }    from './components/event/script';
import { TypeListComponent }      from './components/type-list/script';
import { SiteListComponent }      from './components/site-list/script';
import { ImageFieldComponent }    from './components/image-field/script';
import { Spinner }                from './components/spinner/script';
import { AddSiteComponent }       from './components/add-site/script';
import { SlideFieldComponent }    from './components/slide/script';
import { SliderFieldComponent }   from './components/slider/script';
import { S3FilePicker }           from './components/s3-file-picker/script';
import { LinkFieldComponent }     from './components/link-field/script';

// MOLECULE
import { MoleculeCreate }             from './components/molecule-create/script';
import { MoleculeSelect }             from './components/molecule-select/script';
import { MoleculeSave }               from './components/molecule-save/script';
import { MoleculeRemove }             from './components/molecule-remove/script';
import { MoleculeGeneratorComponent } from './components/molecule-generator/script';
import { MoleculeHierarchyTreeComponent } from './components/molecule-hierarchy-tree/script';
import { MoleculeHierarchyTreeBranchComponent } from './components/molecule-hierarchy-tree/molecule-hierarchy-tree-branch/script';
import { MoleculeBrowserComponent }   from './components/molecule-browser/script';
import { MoleculeConfig }             from './components/molecule-config/script';
import { MoleculeEdit }               from './components/molecule-edit/script';
import { MoleculeRenderer }           from './components/molecule-renderer/script';
import { FusionComponent }            from './components/fusion/script';
import { TableRenderer }              from './components/table-renderer/script';
  // GENERATOR LAYOUTS
  import { GeneratorLayoutHorizontalCards } from "./components/molecule-generator/layouts/cards-horizontal/script";
  import { GeneratorLayoutVerticalCards } from "./components/molecule-generator/layouts/cards-vertical/script";
  import { GeneratorLayoutTable } from "./components/molecule-generator/layouts/table/script";
  import { GeneratorLayoutSidebar } from "./components/molecule-generator/layouts/sidebar/script";


// CUSTOM DIRECTIVES
import { FixedElementDirective }  from './directives/fixed-element/script';

// CUSTOM SERVICES
import { DataService }        from './services/data.service';
import { MoleculeService }    from './services/molecule.service';
import { ServerService }      from './services/server.service';
import { S3Service }          from './services/s3.service';
import { PdService }          from './services/pd.service';
import { Config }             from './services/config.service';

// HELPERS
import { WindowRef }      from './helpers/window-ref';
import { TruncatePipe }   from './pipes/truncate';
import { SafePipe }       from './pipes/safe';
import { UserLabelPipe }  from './pipes/userlabel';
import { KeysPipe }       from './pipes/keys';


//PAGES
import { PageHeader }     from './components/page-header/script';
import { PageFooter }     from './components/page-footer/script';

import { SitePage }             from './pages/site/script';
import { IndexPage }            from './pages/index/script';
import { CellBuilder }          from './pages/cell-builder/script';
import { MoleculeGenerator }    from './pages/molecule-generator/script';
import { GeneratorPage }        from './pages/generator/script';
import { InstancePage }        from './pages/instance/script';



//DEFINE ROUTES
const appRoutes: Routes = require('./config/routes');


@NgModule({
  imports: [
    BrowserModule,
    HttpModule ,
    CommonModule,
    FormsModule,
    MyDatePickerModule,
    ColorPickerModule,
    ImageUploadModule.forRoot(),
    NguiAutoCompleteModule,
    Ng2UploaderModule,
    CKEditorModule,
    DragulaModule,
    RouterModule.forRoot(appRoutes)
  ],
  declarations: [
    ColumnComponent,
    FixedElementDirective,
    KeysPipe,
    ModalComponent,
    MoleculeSelect,
    MoleculeConfig,
    Spinner,
    TypeListComponent,
    UserLabelPipe,
    TruncatePipe,
    S3FilePicker,
    ArtistSelectComponent,
    VenueSelectComponent,
    EventSelectComponent,
    RootComponent,
    SafePipe,
    FileNodeComponent,
    GroupComponent,
    CellComponent,
    TextNodeComponent,
    GeneratorComponent,
    ChildComponent,
    SiteListComponent,
    MutationWrapper,
    SlideFieldComponent,
    SliderFieldComponent,
    PageComponent,
    PageHeader,
    PageFooter,
    ImageFieldComponent,
    DataViewComponent,
    DeleteButtonComponent,
    SaveButtonComponent,
    RowComponent,
    NumberNodeComponent,
    BooleanNodeComponent,
    DateFieldComponent,
    ColorFieldComponent,
    ArtistFieldComponent,
    ArtistListComponent,
    VenueFieldComponent,
    VenueListComponent,
    EventFieldComponent,
    CheckboxComponent,
    ListFieldComponent,
    AddSiteComponent,
    LinkFieldComponent,
    IndexPage,
    GeneratorPage,
    SitePage,
    InstancePage,
    MoleculeGenerator,
    CellBuilder,
    MoleculeRenderer,
    MoleculeSave,
    MoleculeEdit,
    MoleculeRemove,
    MoleculeCreate,
    MoleculeHierarchyTreeComponent,
    MoleculeHierarchyTreeBranchComponent,
    FusionComponent,
    MoleculeGeneratorComponent,
    MoleculeBrowserComponent,
    TableRenderer,
    GeneratorLayoutHorizontalCards,
    GeneratorLayoutVerticalCards,
    GeneratorLayoutTable,
    GeneratorLayoutSidebar
  ],
  entryComponents: [
    GroupComponent,
    CellComponent,
    TextNodeComponent,
    RowComponent,
    SlideFieldComponent,
    SliderFieldComponent,
    LinkFieldComponent,
    ImageFieldComponent,
    FileNodeComponent,
    NumberNodeComponent,
    BooleanNodeComponent,
    DateFieldComponent,
    ColorFieldComponent,
    ArtistFieldComponent,
    VenueFieldComponent,
    EventFieldComponent,
    ListFieldComponent,
    ColumnComponent,
    MoleculeSelect,
    MoleculeHierarchyTreeComponent,
    MoleculeGeneratorComponent,
    MoleculeBrowserComponent,
    GeneratorLayoutHorizontalCards,
    GeneratorLayoutVerticalCards,
    GeneratorLayoutTable,
    GeneratorLayoutSidebar
  ],
  providers :   [
    DatePipe,
    S3Service,
    TruncatePipe,
    DataService,
    ServerService,
    MoleculeService,
    PdService,
    Config,
    WindowRef
  ],
  bootstrap:    [ RootComponent ]
})

export class AppModule { }
