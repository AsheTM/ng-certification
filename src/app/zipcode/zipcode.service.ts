import { Injectable, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { from, Observable, Subscription } from 'rxjs';
import { map, switchMap, switchMapTo, toArray } from 'rxjs/operators';

import { EZipcodeState } from './zipcode.enum';
import { Action, RootState, Selector } from './zipcode.store';
import { TWeather } from './zipcode.type';

import { IntervalService, LocalStorageService, TKeyValue } from '../shared';


@Injectable()
export class ZipcodeService implements OnDestroy {

  localStorageDataZipcode$: Observable<Record<string, string>> 
    = this._localStorageService.itemsSubject$;
  
  autofilterDataZipcode$:   Observable<TKeyValue<string, string>[]>
    = this.localStorageDataZipcode$
      .pipe(
        map(Object.entries), 
        switchMap((entries: [string, string][]) => 
          from(entries).pipe(
            map(([key, value]: [string, string]) => ({ key, value })), 
            toArray()))
      );

  private _loadingStateZipcodeSelector$:  Observable<EZipcodeState> 
    = this._store.select(Selector.getLoadingState);
  isLoadingStateZipcodeSubject$:          Observable<boolean> 
    = this._loadingStateZipcodeSelector$
      .pipe(map((state: EZipcodeState) => state === EZipcodeState.WORKING));
  isDoneStateZipcodeSubject$:             Observable<boolean> 
    = this._loadingStateZipcodeSelector$
      .pipe(map((state: EZipcodeState) => state === EZipcodeState.DONE));
  textButtonZipcodes$:                    Observable<string> 
    = this._loadingStateZipcodeSelector$
      .pipe(map((state: EZipcodeState) => {
        switch(state) {
          case EZipcodeState.DEFAULT: 
            return 'Add location';
          case EZipcodeState.WORKING: 
            return 'Adding...';
          case EZipcodeState.DONE: 
            return 'Done';
          default: 
            return 'unknown text';
        }
      }));
  weathersZipcode$:                       Observable<TWeather[]> 
    = this._store.select(Selector.getWeathers);
  
  private _autoRefreshWeathersZipcode$:   Observable<void> 
    = this._intervalService.interval$
      .pipe(
        switchMapTo(this.localStorageDataZipcode$), 
        map(Object.entries), 
        map((data: [string, string][]) => void this._store.dispatch(Action.getData({ data })))
      );
  private _autoRefreshWeathersZipcodeSubscription:  Subscription | undefined;

  constructor(
    private _store:               Store<RootState>,
    private _intervalService:     IntervalService, 
    private _localStorageService: LocalStorageService
  ) { }

  ngOnDestroy(): void {
    this._autoRefreshWeathersZipcodeSubscription?.unsubscribe();
  }

  enableAutoRefreshWeathers(): void {
    this._autoRefreshWeathersZipcodeSubscription = this._autoRefreshWeathersZipcode$.subscribe();
  }

  getLocationAndZipcode({
    location, 
    zipcode
  }: Record<'location' | 'zipcode', string>): void {
    if(!zipcode) {
      return;
    }

    this._store.dispatch(Action.loadingState({
      location, 
      zipcode
    }));
  }

  deleteZipcode(zipcode: string): void {
    this._localStorageService.deleteItem(zipcode);
  }

}
