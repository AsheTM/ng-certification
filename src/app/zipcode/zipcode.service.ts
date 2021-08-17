import { Injectable } from '@angular/core';
import { EMPTY, from, Observable } from 'rxjs';
import { catchError, concatMap, map, switchMap, switchMapTo, toArray } from 'rxjs/operators';

import { TWeather } from './zipcode.type';

import {
  EHttpErrorCode, 
  getWeatherIcon, 
  HttpService, 
  IntervalService, 
  LocalStorageService, 
  THttpError
} from '../shared';


@Injectable()
export class ZipcodeService {
  
  private _zipcodesZipcode$:  Observable<string[]>    = this._localStorageService.itemsSubject$;
  weathersZipcode$:           Observable<TWeather[]>  = this._intervalService.interval$
    .pipe(
      switchMapTo(this._zipcodesZipcode$), 
      switchMap((zipcodes: string[]) => this._getWeathers(zipcodes))
    );

  constructor(
    private _intervalService:     IntervalService, 
    private _localStorageService: LocalStorageService, 
    private _httpService:         HttpService
  ) { }

  getZipcode(zipcode: string): void {
    if(!zipcode) {
      return;
    }

    this._localStorageService.setItem(zipcode);
  }

  deleteZipcode(zipcode: string): void {
    this._localStorageService.deleteItem(zipcode);
  }

  private _getWeathers(zipcodes: string[]): Observable<TWeather[]> {
    return from(zipcodes).pipe(
      concatMap((zipcode: string) => this._getWeather(zipcode)), 
      toArray()
    );
  }

  private _getWeather(zipcode: string): Observable<TWeather> {
    return this._httpService.getData<TWeather>(zipcode)
      .pipe(
        map((weather: unknown) => this._transformToWeatherObject(zipcode, weather)), 
        catchError((err: any | THttpError) => {
          switch(err.code) {
            case EHttpErrorCode.NO_FALLBACK_PROVIDED: 
              this._localStorageService.deleteItem(zipcode);
          }
          return EMPTY;
        })
      )
  }

  private _transformToWeatherObject(zipcode: string, { main, name, weather }: any): TWeather {
    return {
      condition: weather[0].description, 
      name: name, 
      temperature: {
        current: main.temp, 
        min: main.temp_min, 
        max: main.temp_max
      }, 
      weather: getWeatherIcon(weather[0].main), 
      zipcode
    };
  }

}
