import { Injectable } from '@angular/core';
import {
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { from, Observable } from 'rxjs';
import { map, switchMap, toArray } from 'rxjs/operators';

import { CountriesService, TKeyValue } from '../shared';


@Injectable()
export class ZipcodeCountriesResolver implements Resolve<TKeyValue<string, string>[]> {

  constructor(private readonly _countriesService: CountriesService) { }
  
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<TKeyValue<string, string>[]> {
    return this._countriesService.getAllCountries(500)
      .pipe(
        map(Object.entries), 
        switchMap((entries: [string, Record<'country' | 'region', string>][]) => 
          from(entries).pipe(
            map(([key, { country }]: [string, Record<'country' | 'region', string>]) => ({ key, value: country })), 
            toArray()))
      );
  }
  
}
