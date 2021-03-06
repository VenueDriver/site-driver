import 'core-js';
import 'reflect-metadata';
import 'zone.js/dist/zone';
import 'intl';
import 'intl/locale-data/jsonp/en';

import    { platformBrowserDynamic }   from '@angular/platform-browser-dynamic';
import    { enableProdMode }           from '@angular/core';

import    { PdService }  from './services/pd.service';
import    { AppModule }  from './app.module';
import    { Config }     from './services/config.service';

//enableProdMode();
platformBrowserDynamic().bootstrapModule(AppModule,[PdService,Config]);
