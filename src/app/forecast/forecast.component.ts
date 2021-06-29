import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Observable } from 'rxjs';

import { ForecastService } from './forecast.service';
import { TMapForecast } from './forecast.type';


@Component({
  selector:         'app-forecast',
  templateUrl:      './forecast.component.html',
  styles:           [` p { font-family: Lato; } `], 
  changeDetection:  ChangeDetectionStrategy.OnPush, 
  providers:        [ForecastService]
})
export class ForecastComponent {

  cityName$:  Observable<string>        = this._forecastService.forecastCityName$;
  forecasts$: Observable<TMapForecast>  = this._forecastService.forecasts$;

  constructor(private _forecastService: ForecastService) { }

  nagivateBack(): void {
    this._forecastService.navigateBack();
  }

}
