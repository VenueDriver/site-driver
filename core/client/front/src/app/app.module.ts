import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';

import { PageComponent } from './page/component';
import { PageHeader } from './page-header/component';
import { PageFooter } from './page-footer/component';

const routes : Routes = [
    {
      path: '',
      loadChildren: './cell-builder/module#CellBuilderModule'
    }
  ];

@NgModule({
  declarations: [
    AppComponent,
    PageComponent,
    PageHeader,
    PageFooter
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
