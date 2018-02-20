import { NgModule , APP_INITIALIZER }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule }    from '@angular/http'
import { RouterModule, Routes } from '@angular/router';

import { WindowRef }      from './helpers/window-ref';
import { RootComponent }  from './root.component';
import { OwlCarousel }    from './components/owl-carousel/script';
import { Spinner }        from './components/spinner/script';
import { Calendar }       from './components/calendar/script';
import { ComboBox }       from './components/combo-box/script';
import { CalendarYear }   from './components/calendar/year/script';
import { CalendarMonth }  from './components/calendar/month/script';
import { CalendarWeek }   from './components/calendar/week/script';
import { CalendarDay }    from './components/calendar/day/script';
import { Image }    from './components/image/script';
import { EventList }      from './components/event-list/script';
import { EventSlider }    from './components/event-slider/script';
import { EventDetail }    from './components/event-detail/script';
import { OverlayComponent }   from './components/overlay/script';
import { EventFilter }    from './components/event-filter/script';
import { PdService }      from './services/pd.service';
import { Config }         from './services/config.service';
import { KeysPipe }       from './pipes/keys';
import { SafePipe }       from './pipes/safe';
import { TruncatePipe }   from './pipes/truncate';

const appRoutes: Routes = require('../site_config/routes');

@NgModule({
  imports:      [ BrowserModule, HttpModule, RouterModule.forRoot(appRoutes) ],
  declarations: [
    TruncatePipe,
    Image,
    ComboBox,
    Spinner,
    OwlCarousel,
    CalendarYear,
    CalendarMonth,
    CalendarWeek,
    CalendarDay,
    EventList,
    OverlayComponent,
    EventSlider,
    EventDetail,
    RootComponent,
    EventFilter,
    Calendar,
    KeysPipe,
    SafePipe
  ],
  providers :   [
    PdService,
    WindowRef,
    Config,
      { provide: APP_INITIALIZER, useFactory: (config: Config ) => () => config.load(), deps: [Config], multi: true }
  ],
  bootstrap: [ RootComponent ]
})

export class AppModule { }
