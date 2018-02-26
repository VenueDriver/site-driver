import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';

import { PageComponent } from './page/component';
import { PageHeader } from './page-header/component';
import { PageFooter } from './page-footer/component';


@NgModule({
  declarations: [
    AppComponent,
    PageComponent,
    PageHeader,
    PageFooter
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
