import { ChangeDetectionStrategy, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';

import { ZipcodeService } from './zipcode.service';
import { TWeather } from './zipcode.type';

import { SharedInputComponent, TKeyValue } from '../shared';


@Component({
  selector:         'app-zipcode',
  templateUrl:      './zipcode.component.html',
  styles:           [` p { font-family: Lato; } `], 
  changeDetection:  ChangeDetectionStrategy.OnPush, 
  providers:        [ZipcodeService]
})
export class ZipcodeComponent implements OnInit {

  @ViewChild('Location')  locationInputRef: SharedInputComponent;
  @ViewChild('Zipcode')   zipcodeInputRef:  ElementRef<HTMLInputElement>;

  autofilterData$:    Observable<TKeyValue[]>             = this._zipcodeService.autofilterDataZipcode$;
  isDoneState$:       Observable<boolean>                 = this._zipcodeService.isDoneStateZipcodeSubject$;
  isLoadingState$:    Observable<boolean>                 = this._zipcodeService.isLoadingStateZipcodeSubject$;
  localStorageData$:  Observable<Record<string, string>>  = this._zipcodeService.localStorageDataZipcode$;
  textButton$:        Observable<string>                  = this._zipcodeService.textButtonZipcodes$;
  weathers$:          Observable<TWeather[]>              = this._zipcodeService.weathersZipcode$;

  constructor(private _zipcodeService: ZipcodeService) { }

  ngOnInit(): void {
    this._zipcodeService.enableAutoRefreshWeathers();
  }

  onClickEventHandler(zipcode: string, location: string): void {
    this._clearZipcodeinput();
    this._zipcodeService.getLocationAndZipcode({
      location, 
      zipcode
    });
  }

  onCloseEventHandler(zipcode: string): void {
    this._zipcodeService.deleteZipcode(zipcode);
  }
  
  private _clearZipcodeinput() {
    this.locationInputRef.writeValue('');
    this.zipcodeInputRef.nativeElement.value = null;
  }

}
