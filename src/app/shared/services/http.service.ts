import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Inject, Injectable, Optional, Self } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { SharedModule } from '../shared.module';
import { SHARED_TOKEN_VALUE_FALLBACK, SHARED_TOKEN_VALUE_HTTP, SHARED_TOKEN_VALUE_INTERCEPTOR } from '../shared.provider';
import { TSharedModuleConfigurationFallback, TSharedModuleConfigurationHttp, TSharedModuleConfigurationInterceptor } from '../shared.type';

import { EHttpErrorCode } from '../enum';
import { THttpError } from '../type';


@Injectable({
  providedIn: SharedModule
})
export class HttpService {

  private readonly HTTP_URL:          string    = this._sharedModuleConfigurationRootHttp.url;
  private readonly HTTP_PARAM:        string    = this._sharedModuleConfigurationRootHttp.param;
  private readonly HTTP_API_KEY:      string    = this._sharedModuleConfigurationRootHttp.apiKey;

  private readonly FALLBACK_URL:      string    = this._sharedModuleConfigurationRootFallback?.url;
  private readonly FALLBACK_PARAM:    string    = this._sharedModuleConfigurationRootFallback?.param;
  private readonly FALLBACK_STATIC:   string[]  = this._sharedModuleConfigurationRootFallback?.static;

  private readonly INTERCEPTOR_PARAM: string    = this._sharedModuleConfigurationRootInterceptor.param;

  constructor(
    @Inject(SHARED_TOKEN_VALUE_HTTP) 
      private _sharedModuleConfigurationRootHttp: TSharedModuleConfigurationHttp, 
    @Self()
    @Optional()
    @Inject(SHARED_TOKEN_VALUE_FALLBACK) 
      private _sharedModuleConfigurationRootFallback: TSharedModuleConfigurationFallback, 
    @Inject(SHARED_TOKEN_VALUE_INTERCEPTOR) 
      private _sharedModuleConfigurationRootInterceptor: TSharedModuleConfigurationInterceptor, 
    private _httpClient: HttpClient
  ) { }

  getData<T = any>(id: string): Observable<T | THttpError | unknown> {
    return this._httpClient.get<T>(this.HTTP_URL, {
      params: {
        [this.HTTP_PARAM]: id, 
        appid: this.HTTP_API_KEY, 
        [this.INTERCEPTOR_PARAM]: this.HTTP_PARAM
      }
    }).pipe(catchError(() => this._buildFallbackRequest(id)));
  }

  private _buildFallbackRequest<T = any>(id: string): Observable<T> {
    switch(true) {
      case !this.FALLBACK_URL: 
      case !this.FALLBACK_PARAM: 
      case !this.FALLBACK_STATIC.includes(id): 
        return throwError({ code: EHttpErrorCode.NO_FALLBACK_PROVIDED });
      default: 
        return this._httpClient.get<T>(this.FALLBACK_URL, {
          params: {
            [this.FALLBACK_PARAM]: id, 
            [this.INTERCEPTOR_PARAM]: this.FALLBACK_PARAM
          }
        });
    }
  }

}
