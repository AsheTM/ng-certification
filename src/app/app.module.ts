import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { CoreModule } from './core';
import { SharedModule } from './shared';

import { environment } from 'src/environments';


@NgModule({
  imports:      [
    BrowserModule, 

    AppRoutingModule, 

    CoreModule.forRoot(environment.configuration.core), 
    SharedModule.forRoot(environment.configuration.shared.root)
  ],
  declarations: [AppComponent],
  bootstrap:    [AppComponent]
})
export class AppModule { }
