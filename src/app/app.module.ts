import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { CoreModule } from './core';
import { SharedModule } from './shared';

import { environment } from 'src/environments/environment';


@NgModule({
  imports:      [
    BrowserModule, 

    AppRoutingModule, 

    CoreModule.forRoot(environment.configuration.core), 
    SharedModule.forRoot({
      ...environment.configuration.shared, 
      http:         {
        apiKey: environment.configuration.shared.http.apiKey,
        param:  environment.configuration.shared.http.param,
        url:    environment.configuration.shared.http.urls.weather
      }
    })
  ],
  declarations: [AppComponent],
  bootstrap:    [AppComponent]
})
export class AppModule { }
