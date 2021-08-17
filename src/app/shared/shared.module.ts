import { Inject, ModuleWithProviders, NgModule, Optional, Self, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { ESharedProvider } from './shared.enum';
import {
  SHARED_TOKEN_VALUE_HTTP, 
  SHARED_TOKEN_VALUE_FALLBACK, 
  SHARED_TOKEN_VALUE_STORAGE,
  SHARED_TOKEN_VALUE_INTERCEPTOR,
  SHARED_PROVIDER_FOR_ROOT,
  SHARED_PROVIDER_FOR_FEATURE
} from './shared.token';
import { TSharedModuleConfiguration } from './shared.type';

import { CapitalCasePipe } from './pipes';
import { CacheInterceptor } from './interceptors';


@NgModule({
  imports: [
    CommonModule, 
    FormsModule, 
    HttpClientModule
  ], 
  exports: [
    CommonModule, 
    FormsModule, 
    HttpClientModule, 

    CapitalCasePipe
  ], 
  declarations: [CapitalCasePipe], 
  providers:    [
    {
      provide:  HTTP_INTERCEPTORS, 
      useClass: CacheInterceptor, 
      multi:    true
    }
  ]
})
export class SharedModule {

  static forRoot({ http, interceptor, storage }: Pick<TSharedModuleConfiguration, 'http' | 'interceptor' | 'storage'>): ModuleWithProviders<SharedModule> {
    return {
      ngModule: SharedModule, 
      providers: [
        {
          provide:  SHARED_TOKEN_VALUE_HTTP, 
          useValue: http
        }, {
          provide:  SHARED_TOKEN_VALUE_INTERCEPTOR, 
          useValue: interceptor
        }, {
          provide:  SHARED_TOKEN_VALUE_STORAGE, 
          useValue: storage
        }
      ]
    };
  }

  static forFeature({ http, fallback }: Pick<TSharedModuleConfiguration, 'http' | 'fallback'>): ModuleWithProviders<SharedModule> {
    return {
      ngModule: SharedModule, 
      providers: [
        {
          provide:  SHARED_TOKEN_VALUE_HTTP, 
          useValue: http
        }, {
          provide:  SHARED_TOKEN_VALUE_FALLBACK, 
          useValue: fallback
        }
      ]
    };
  }
  
}
