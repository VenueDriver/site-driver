import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';

const routes: Routes = [
    {
        path: '**',
        loadChildren: 'app/cell-builder/module#CellBuilderModule'
    }
];

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule,RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
