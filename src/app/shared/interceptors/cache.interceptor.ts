import { Inject, Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse
} from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';

import { TCache } from '../type';
import { SHARED_TOKEN_VALUE_INTERCEPTOR } from '../shared.provider';
import { TSharedModuleConfigurationInterceptor } from '../shared.type';


@Injectable()
export class CacheInterceptor implements HttpInterceptor {

  private readonly NAVIGATOR: Navigator = window.navigator;
  private readonly CACHE:     TCache    = {};

  private readonly PARAM:     string    = this._sharedModuleConfigurationInterceptor.param;

  constructor(@Inject(SHARED_TOKEN_VALUE_INTERCEPTOR) private _sharedModuleConfigurationInterceptor: TSharedModuleConfigurationInterceptor) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const { method, params }: HttpRequest<unknown>  = request;
    const paramInterceptor:   string                = params.get(this.PARAM);
    const param:              string                = params.get(paramInterceptor);

    if(!this.NAVIGATOR.onLine && method === 'GET') {
      return of(this.CACHE[param]);
    }

    return next.handle(request)
      .pipe(tap((event: HttpEvent<unknown>) => {
        if(event instanceof HttpResponse) {
          this.CACHE[param] = event;
        }
      }))
  }
}
