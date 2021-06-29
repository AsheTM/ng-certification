import { ChangeDetectionStrategy, Component, ElementRef, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';

import { ZipcodeService } from './zipcode.service';
import { TWeather } from './zipcode.type';


@Component({
  selector:         'app-zipcode',
  templateUrl:      './zipcode.component.html',
  styles:           [` p { font-family: Lato; } `], 
  changeDetection:  ChangeDetectionStrategy.OnPush, 
  providers:        [ZipcodeService]
})
export class ZipcodeComponent {

  @ViewChild('Zipcode') zipcodeInputRef: ElementRef<HTMLInputElement>;
  
  weathers$: Observable<TWeather[]> = this._zipcodeService.zipcodes$;

  constructor(private _zipcodeService: ZipcodeService) { }

  onClickEventHandler(zipcode: string): void {
    this._clearZipcodeinput();
    this._zipcodeService.getZipcode(zipcode);
  }

  onCloseEventHandler(zipcode: string): void {
    this._zipcodeService.deleteZipcode(zipcode);
  }
  
  private _clearZipcodeinput() {
    this.zipcodeInputRef.nativeElement.value = null;
  }

}
