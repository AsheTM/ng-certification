import { HttpClient } from '@angular/common/http';
import { Inject, Injectable, Optional, Self } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { SharedModule } from '../shared.module';
import {
  SHARED_TOKEN_VALUE_FALLBACK, 
  SHARED_TOKEN_VALUE_HTTP
} from '../shared.token';
import {
  TSharedModuleConfigurationFallback, 
  TSharedModuleConfigurationHttp
} from '../shared.type';

import { EHttpErrorCode } from '../enums';
import { DataHttpHandler } from '../http-handlers';
import { THttpError } from '../types';


@Injectable({
  providedIn: SharedModule
})
export class DataService extends HttpClient {

  private readonly HTTP_URL:            string    = this._sharedModuleConfigurationRootHttp.url;
  private readonly HTTP_PARAM_ZIPCODE:  string    = this._sharedModuleConfigurationRootHttp.params.zipcode;

  private readonly FALLBACK_URL:            string    = this._sharedModuleConfigurationRootFallback?.url;
  private readonly FALLBACK_PARAM_ZIPCODE:  string    = this._sharedModuleConfigurationRootFallback?.params.zipcode;

  constructor(
    @Inject(SHARED_TOKEN_VALUE_HTTP) 
      private _sharedModuleConfigurationRootHttp: TSharedModuleConfigurationHttp, 
    @Self()
    @Optional()
    @Inject(SHARED_TOKEN_VALUE_FALLBACK) 
      private _sharedModuleConfigurationRootFallback: TSharedModuleConfigurationFallback, 
    private _apiHttpHandler: DataHttpHandler
  ) {
    super(_apiHttpHandler);
  }

  getData<T = any>(zipcode: string, location: string): Observable<T | THttpError | unknown> {
    return super.get<T>(this.HTTP_URL, {
      params: {
        [this.HTTP_PARAM_ZIPCODE]:  `${zipcode},${location}`
      }
    }).pipe(catchError(() => this._buildFallbackRequest(zipcode, location)));
  }

  private _buildFallbackRequest<T = any>(zipcode: string, location?: string): Observable<T> {
    switch(true) {
      case !this.FALLBACK_URL: 
      case !this.FALLBACK_PARAM_ZIPCODE: 
        return throwError({ code: EHttpErrorCode.NO_FALLBACK_PROVIDED });
      default: 
        return super.get<T>(this.FALLBACK_URL, {
          params: {
            [this.FALLBACK_PARAM_ZIPCODE]:  `${zipcode},${location}`
          }
        });
    }
  }

}
