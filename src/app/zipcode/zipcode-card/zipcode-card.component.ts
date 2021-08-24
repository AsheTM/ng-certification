import { Component, EventEmitter, Input, Output } from '@angular/core';

import { TWeatherTemperature } from '../zipcode.type';

import { EWeatherIcon } from 'src/app/shared';


@Component({
  selector:     'app-zipcode-card',
  templateUrl:  './zipcode-card.component.html'
})
export class ZipcodeCardComponent {
  
  @Input() condition:   string
  @Input() name:        string;
  @Input() location:    string;
  @Input() temperature: TWeatherTemperature;
  @Input() weather:     EWeatherIcon;
  @Input() zipcode:     string;
  
  @Output() close: EventEmitter<string> = new EventEmitter<string>();

  get icon(): string {
    return `https://www.angulartraining.com/images/weather/${this.weather}.png`;
  }

  get queryParams(): Record<string, number | string> {
    return {
      location: this.location, 
      zipcode:  this.zipcode
    };
  }

  onClickEventHandler(): void {
    this.close.emit(this.zipcode);
  }

}
