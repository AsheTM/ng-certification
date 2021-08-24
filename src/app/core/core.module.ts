import { APP_BASE_HREF } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { CoreModuleConfigurationType } from './core.type';

import { AppReducer, AppState } from '../app.store';


@NgModule({
  imports:  [
    BrowserModule, 
    EffectsModule.forRoot([]), 
    StoreModule.forRoot(AppReducer.reducer, {
      initialState: AppState.INITIAL
    })
  ], 
  exports:  [
    BrowserModule, 
    EffectsModule, 
    StoreModule
  ]
})
export class CoreModule {

  static forRoot({ baseHref }: CoreModuleConfigurationType): ModuleWithProviders<CoreModule> {
    return {
      ngModule: CoreModule, 
      providers: [
        {
          provide:  APP_BASE_HREF, 
          useValue: baseHref
        }
      ]
    }
  }
  
}
