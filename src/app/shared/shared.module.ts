import { Inject, ModuleWithProviders, NgModule, Optional, Self, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ESharedProvider } from './shared.enum';
import {
  SHARED_TOKEN_VALUE_HTTP, 
  SHARED_TOKEN_VALUE_FALLBACK, 
  SHARED_TOKEN_VALUE_STORAGE,
  SHARED_TOKEN_VALUE_INTERCEPTOR,
  SHARED_PROVIDER_FOR_ROOT,
  SHARED_PROVIDER_FOR_FEATURE,
  SHARED_TOKEN_VALUE_API
} from './shared.token';
import { TSharedModuleConfiguration } from './shared.type';

import {
  SharedButtonComponent, 
  SharedInputComponent
} from './components';
import { CacheInterceptor } from './interceptors';
import { CapitalCasePipe, BoldPipe, FilterPipe } from './pipes';


@NgModule({
  declarations: [
    SharedButtonComponent, 
    SharedInputComponent, 

    BoldPipe, 
    CapitalCasePipe, 
    FilterPipe
  ], 
  imports: [
    CommonModule, 
    FormsModule, 
    ReactiveFormsModule, 
    HttpClientModule
  ], 
  exports: [
    CommonModule, 
    FormsModule, 
    ReactiveFormsModule, 
    HttpClientModule, 

    SharedButtonComponent, 
    SharedInputComponent, 

    BoldPipe, 
    CapitalCasePipe, 
    FilterPipe
  ], 
  providers:    [
    {
      provide:  HTTP_INTERCEPTORS, 
      useClass: CacheInterceptor, 
      multi:    true
    }, 

    {
      provide:  SHARED_PROVIDER_FOR_ROOT,
      useValue: ESharedProvider.NO_STATIC_METHODS_INVOKED
    }, {
      provide:  SHARED_PROVIDER_FOR_FEATURE,
      useValue: ESharedProvider.NO_STATIC_METHODS_INVOKED
    }
  ]
})
export class SharedModule {

  constructor(
    @Self()
    @Inject(SHARED_PROVIDER_FOR_ROOT)
      private _forRoot: number,
    @SkipSelf()
    @Optional()
    @Inject(SHARED_PROVIDER_FOR_ROOT)
      private _forRootInFeature: number,
    @Self()
    @Inject(SHARED_PROVIDER_FOR_FEATURE)
      private _forFeature: number,
  ) {
    switch(true) {
      case this._forRoot === ESharedProvider.NO_STATIC_METHODS_INVOKED && this._forRootInFeature === null:
        throw new Error(`[${this.constructor.name}] You must call the \'forRoot\' static method in app.module.ts!`);
      case this._forRootInFeature === ESharedProvider.FOR_ROOT && this._forFeature === ESharedProvider.NO_STATIC_METHODS_INVOKED:
        throw new Error(`[${this.constructor.name}] You must call the \'forFeature\' static method in that feature module!`);
    }
  }

  static forRoot({
    api, 
    interceptor, 
    storage
  }: Pick<TSharedModuleConfiguration, 'api' | 'interceptor' | 'storage'>): ModuleWithProviders<SharedModule> {
    return {
      ngModule: SharedModule, 
      providers: [
        {
          provide:  SHARED_PROVIDER_FOR_ROOT,
          useValue: ESharedProvider.FOR_ROOT
        }, 

        {
          provide:  SHARED_TOKEN_VALUE_API, 
          useValue: api
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

  static forFeature({
    http, 
    fallback
  }: Pick<TSharedModuleConfiguration, 'http'> 
    & Partial<Pick<TSharedModuleConfiguration, 'fallback'>>): ModuleWithProviders<SharedModule> {
    return {
      ngModule: SharedModule, 
      providers: [
        {
          provide:  SHARED_PROVIDER_FOR_FEATURE,
          useValue: ESharedProvider.FOR_FEATURE
        }, 

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
