import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { from, GroupedObservable, Observable, of, zip } from 'rxjs';
import { groupBy, map, mergeMap, pluck, reduce, switchMap, take, toArray } from 'rxjs/operators';

import { FORECAST_ROUTE_ROOT_PARAM_ID } from './forecast.route';
import { TForecast, TForecasts, TMapForecast, TZipForecast } from './forecast.type';

import { APP_ROUTE_ROOT } from '../app.route';

import { getWeatherIcon, HttpService, TTemperature } from '../shared';


@Injectable()
export class ForecastService {

  private _zipcode$:      Observable<string>        = this._activatedRoute.params
    .pipe(pluck(FORECAST_ROUTE_ROOT_PARAM_ID));
  
  private _forecast$:     Observable<any>           = this._zipcode$
    .pipe(
      switchMap((zipcode: string) => this._httpService.getData<any>(zipcode)), 
      take(1)
    );
  forecastCityName$:      Observable<string>        = this._forecast$
    .pipe(pluck('city', 'name'));

  forecasts$:             Observable<TMapForecast>  = this._forecast$
    .pipe(
      pluck('list'), 
      switchMap(from),
      groupBy(
        ({ dt_txt }: any) => (dt_txt as string).substr(0, 10), 
        ({ main, weather }: any) => ({
          condition:    weather[0].description,
          temperature:  {
            max: main.temp_max, 
            min: main.temp_min
          }, 
          weather:      getWeatherIcon(weather[0].main)
        } as TForecast)
      ), 
      take(5), 
      mergeMap((group: GroupedObservable<string, TForecast>) => zip<TZipForecast>(
        of(group.key), 
        group.pipe(
          toArray(), 
          map<TForecasts, TForecast>((forecasts: TForecasts) => {
            const { min, max }: TTemperature = forecasts.reduce((acc: TTemperature, { temperature }: TForecast) => ({
              min: acc.min + temperature.min, 
              max: acc.max + temperature.max
            }), {
              min: 0, 
              max: 0
            });
            return {
              condition:    forecasts[0].condition, 
              temperature:  {
                min: min / forecasts.length, 
                max: max / forecasts.length
              }, 
              weather:      forecasts[0].weather
            };
          })
        )
      )), 
      reduce((acc: TMapForecast, [dateStringified, forecast]: TZipForecast) => void (acc[dateStringified] = forecast) || acc, {})
    );

  constructor(
    private _activatedRoute: ActivatedRoute, 
    private _httpService: HttpService, 
    private _router: Router
  ) { }

  navigateBack(): void {
    this._router.navigateByUrl(APP_ROUTE_ROOT);
  }

}
