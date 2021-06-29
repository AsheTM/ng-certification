import { NgModule } from '@angular/core';

import { ForecastRoutingModule } from './forecast-routing.module';
import { ForecastComponent } from './forecast.component';

import { SharedModule } from '../shared';

import { environment } from 'src/environments/environment';


@NgModule({
  declarations: [
    ForecastComponent
  ],
  imports: [
    SharedModule.forFeature({
      http:         {
        apiKey: environment.configuration.shared.http.apiKey,
        param:  environment.configuration.shared.http.param,
        url:    environment.configuration.shared.http.urls.forecast
      }, 
      fallback:  {
        url:    environment.configuration.shared.fallback.urls.forecast,
        param:  environment.configuration.shared.fallback.param,
        static: environment.configuration.shared.fallback.static
      }
    }),

    ForecastRoutingModule
  ]
})
export class ForecastModule { }
