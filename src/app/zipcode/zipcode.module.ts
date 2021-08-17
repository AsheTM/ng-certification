import { NgModule } from '@angular/core';

import { ZipcodeRoutingModule } from './zipcode-routing.module';
import { ZipcodeComponent } from './zipcode.component';

import { ZipcodeCardComponent } from './zipcode-card';

import { SharedModule } from '../shared';

import { environment } from 'src/environments';


@NgModule({
  declarations: [
    ZipcodeComponent,
 
    ZipcodeCardComponent
  ],
  imports:      [
    SharedModule.forFeature(environment.configuration.shared.feature.zipcode),

    ZipcodeRoutingModule
  ]
})
export class ZipcodeModule { }
