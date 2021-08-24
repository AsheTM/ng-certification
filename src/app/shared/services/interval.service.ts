import { Inject, Injectable } from '@angular/core';
import { iif, Observable, of, timer } from 'rxjs';

import { SharedModule } from '../shared.module';
import { SHARED_TOKEN_VALUE_HTTP } from '../shared.token';
import { TSharedModuleConfigurationHttp } from '../shared.type';


@Injectable({
  providedIn: SharedModule
})
export class IntervalService {

  private readonly INTERVAL:  number | undefined  = this._sharedModuleConfigurationRootHttp.interval;
  
  interval$:  Observable<void>  = iif(() => this.INTERVAL !== undefined, timer(0, this.INTERVAL), of(null));

  constructor(
    @Inject(SHARED_TOKEN_VALUE_HTTP) 
      private _sharedModuleConfigurationRootHttp: TSharedModuleConfigurationHttp
  ) { }

}
