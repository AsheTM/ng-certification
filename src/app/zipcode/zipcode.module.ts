import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { ZipcodeRoutingModule } from './zipcode-routing.module';
import { ZipcodeComponent } from './zipcode.component';
import { ZipcodeEffects } from './zipcode.effects';
import { Reducer, Selector, State } from './zipcode.store';

import { ZipcodeCardComponent } from './zipcode-card';

import { SharedModule } from '../shared';

import { environment } from 'src/environments';
import { ZipcodeCountriesResolver } from './zipcode-countries.resolver';


@NgModule({
  declarations: [
    ZipcodeComponent,

    ZipcodeCardComponent
  ],
  imports:      [
    SharedModule.forFeature(environment.configuration.shared.feature.zipcode),
    
    EffectsModule.forFeature([ZipcodeEffects]),
    StoreModule.forFeature(Selector.SLICE_STATE, Reducer.reducer, {
      initialState: State.INITIAL
    }), 

    ZipcodeRoutingModule
  ], 
  providers:    [
    ZipcodeCountriesResolver
  ]
})
export class ZipcodeModule { }
