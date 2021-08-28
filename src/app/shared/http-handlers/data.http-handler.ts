import { HttpEvent, HttpHandler, HttpRequest } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { SharedModule } from '../shared.module';
import { SHARED_TOKEN_VALUE_HTTP, SHARED_TOKEN_VALUE_INTERCEPTOR } from '../shared.token';
import { TSharedModuleConfigurationHttp, TSharedModuleConfigurationInterceptor } from '../shared.type';


@Injectable({
  providedIn: SharedModule
})
export class DataHttpHandler implements HttpHandler {

    private readonly HTTP_PARAM_ZIPCODE:    string  = this._sharedModuleConfigurationRootHttp.params.zipcode;
    private readonly HTTP_API_KEY:          string  = this._sharedModuleConfigurationRootHttp.apiKey;

    private readonly INTERCEPTOR_PARAM:     string  = this._sharedModuleConfigurationRootInterceptor.param;

    constructor(
        @Inject(SHARED_TOKEN_VALUE_HTTP) 
            private _sharedModuleConfigurationRootHttp:  TSharedModuleConfigurationHttp, 
        @Inject(SHARED_TOKEN_VALUE_INTERCEPTOR) 
            private _sharedModuleConfigurationRootInterceptor: TSharedModuleConfigurationInterceptor, 
        private _httpHandler: HttpHandler
    ) { }

    handle(req: HttpRequest<unknown>): Observable<HttpEvent<unknown>> {
        const request:  HttpRequest<unknown>    = req.clone({
            setParams: {
                appid: this.HTTP_API_KEY, 
                [this.INTERCEPTOR_PARAM]:   this.HTTP_PARAM_ZIPCODE
            }
        });

        return this._httpHandler.handle(request);
    }

}
