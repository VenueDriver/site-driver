import { NgModule , APP_INITIALIZER }       from '@angular/core';
import { BrowserModule }                    from '@angular/platform-browser';
import { HttpModule }                       from '@angular/http'
import { RouterModule, Routes }             from '@angular/router';
import { FormsModule }                      from '@angular/forms';
import { CommonModule }                     from '@angular/common';
import { DatePipe }                         from '@angular/common';

// THIRD PARTY
import { NguiAutoCompleteModule } from '@ngui/auto-complete';
import { MyDatePickerModule }     from 'mydatepicker';
import { ColorPickerModule }      from 'angular2-color-picker';
import { ImageUploadModule }      from 'angular2-image-upload';
import { Ng2UploaderModule }      from 'ng2-uploader';
import { DragulaModule }           from 'ng2-dragula';


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
import { NumberFieldComponent }   from './components/number/script';
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
import { FileFieldComponent }     from './components/file-field/script';
import { Spinner }                from './components/spinner/script';
import { AddSiteComponent }       from './components/add-site/script';
import { SlideFieldComponent }    from './components/slide/script';
import { SliderFieldComponent }   from './components/slider/script';
import { S3FilePicker }           from './components/s3-file-picker/script';
import { LinkFieldComponent }     from './components/link-field/script';

// MOLECULE
import { MoleculeSelect }         from './components/molecule-select/script';
import { MoleculeGeneratorComponent }  from './components/molecule-generator/script';
import { MoleculeConfig }         from './components/molecule-config/script';
import { MoleculeRenderer }       from './components/molecule-renderer/script';
import { FusionComponent }        from './components/fusion/script';

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
    FileFieldComponent,
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
    NumberFieldComponent,
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
    SitePage,
    MoleculeGenerator,
    CellBuilder,
    MoleculeRenderer,
    FusionComponent,
    MoleculeGeneratorComponent
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
    FileFieldComponent,
    NumberFieldComponent,
    DateFieldComponent,
    ColorFieldComponent,
    ArtistFieldComponent,
    VenueFieldComponent,
    EventFieldComponent,
    ListFieldComponent,
    ColumnComponent,
    MoleculeGeneratorComponent
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
