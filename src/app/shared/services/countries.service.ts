import { HttpClient, HttpHandler } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { pluck } from 'rxjs/operators';

import { SharedModule } from '../shared.module';
import { SHARED_TOKEN_VALUE_API } from '../shared.token';
import { TSharedModuleConfigurationApi } from '../shared.type';


@Injectable({
  providedIn: SharedModule
})
export class CountriesService extends HttpClient {

  private readonly API_URL:         string  = this._sharedModuleConfigurationRootApi.url;
  private readonly API_PARAM_LIMIT: string  = this._sharedModuleConfigurationRootApi.params.limit;

  constructor(
    @Inject(SHARED_TOKEN_VALUE_API) 
      private readonly _sharedModuleConfigurationRootApi: TSharedModuleConfigurationApi, 
    private readonly _httpHandler: HttpHandler
  ) {
    super(_httpHandler);
  }
  
  getAllCountries(limit: number = 500): Observable<Record<string, string>> {
    return super.get(this.API_URL, {
      params:           {
        [this.API_PARAM_LIMIT]: String(limit)
      }, 
      withCredentials:  true
    }).pipe(pluck('data'));
  }

}
