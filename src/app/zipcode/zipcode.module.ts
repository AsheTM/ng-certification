import { NgModule } from '@angular/core';

import { ZipcodeRoutingModule } from './zipcode-routing.module';
import { ZipcodeComponent } from './zipcode.component';

import { ZipcodeCardComponent } from './zipcode-card';

import { SharedModule } from '../shared';

import { environment } from 'src/environments/environment';


@NgModule({
  declarations: [
    ZipcodeComponent,
    ZipcodeCardComponent
  ],
  imports: [
    SharedModule.forFeature({
      http:         {
        apiKey: environment.configuration.shared.http.apiKey,
        param:  environment.configuration.shared.http.param,
        url:    environment.configuration.shared.http.urls.weather
      }, 
      fallback:  {
        url:    environment.configuration.shared.fallback.urls.weather,
        param:  environment.configuration.shared.fallback.param,
        static: environment.configuration.shared.fallback.static
      }
    }),

    ZipcodeRoutingModule
  ]
})
export class ZipcodeModule { }
