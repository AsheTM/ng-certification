import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { TypedAction } from '@ngrx/store/src/models';
import { EMPTY, from, Observable } from 'rxjs';
import {
  catchError, 
  concatMap, 
  delay, 
  map, 
  mapTo, 
  mergeMap, 
  pluck, 
  switchMap, 
  switchMapTo, 
  tap, 
  toArray
} from 'rxjs/operators';

import { Action } from './zipcode.store';
import { TWeather } from './zipcode.type';

import { EHttpErrorCode, getWeatherIcon, HttpService, LocalStorageService, THttpError } from '../shared';


@Injectable()
export class ZipcodeEffects {

  weathersLoaded$:        Observable<any>
    = createEffect(() => this._actions$.pipe(
      ofType(Action.getData), 
      pluck('data'), 
      switchMap((items: [string, string][]) => this._getWeathers(items)), 
      map((weathers: TWeather[]) => Action.weathersLoaded({ weathers }))
    ));

  newLocationAndZipcode$: Observable<TypedAction<string>>
    = createEffect(() => this._actions$.pipe(
      ofType(Action.loadingState),
      tap(({ location, zipcode }: Record<'location' | 'zipcode', string>) => 
        this._localStorageService.setItem({ [zipcode]: location })), 
      switchMapTo(this._localStorageService.itemsSubject$), 
      map(Object.entries), 
      switchMap((items: [string, string][]) => this._getWeathers(items)), 
      mergeMap((weathers: TWeather[]) => from([
        Action.weathersLoaded({ weathers }), 
        Action.doneState()
      ]))
    ));

  loadedState$:           Observable<TypedAction<string>>
    = createEffect(() => this._actions$.pipe(
      ofType(Action.doneState),
      delay(1000), 
      mapTo(Action.loadedState())
    ));

  constructor(
    private _actions$:            Actions, 
    private _httpService:         HttpService, 
    private _localStorageService: LocalStorageService
  ) { }

  private _getWeathers(items: [string, string][]): Observable<TWeather[]> {
    return from(items).pipe(
      concatMap(([zipcode, location]: [string, string]) => this._getWeather(zipcode, location)), 
      toArray()
    );
  }

  private _getWeather(zipcode: string, location: string): Observable<TWeather> {
    return this._httpService.getData<TWeather>(zipcode, location)
      .pipe(
        map((weather: unknown) => this._transformToWeatherObject(zipcode, location, weather)), 
        catchError((err: any | THttpError) => {
          switch(err.code) {
            case EHttpErrorCode.NO_FALLBACK_PROVIDED: 
              this._localStorageService.deleteItem(zipcode);
          }

          return EMPTY;
        })
      )
  }

  private _transformToWeatherObject(zipcode: string, location: string, { main, name, weather }: any): TWeather {
    return {
      condition:    weather[0].description, 
      location, 
      name:         name, 
      temperature:  {
        current:  main.temp, 
        min:      main.temp_min, 
        max:      main.temp_max
      }, 
      weather:      getWeatherIcon(weather[0].main), 
      zipcode
    };
  }

}
