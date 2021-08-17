import { NgModule } from '@angular/core';

import { ForecastRoutingModule } from './forecast-routing.module';
import { ForecastComponent } from './forecast.component';

import { SharedModule } from '../shared';

import { environment } from 'src/environments';


@NgModule({
  declarations: [
    ForecastComponent
  ],
  imports: [
    SharedModule.forFeature(environment.configuration.shared.feature.forecast),

    ForecastRoutingModule
  ]
})
export class ForecastModule { }
