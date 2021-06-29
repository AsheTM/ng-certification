import { APP_BASE_HREF } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { CoreModuleConfigurationType } from './core.type';


@NgModule({
  imports:  [BrowserModule], 
  exports:  [BrowserModule]
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
