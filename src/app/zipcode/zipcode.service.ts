import { Injectable, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { map, pluck, switchMapTo } from 'rxjs/operators';

import { ZIPCODE_CONSTANT_RESOLVER_COUNTRIES } from './zipcode.constant';
import { Action, RootState, Selector } from './zipcode.store';
import { TWeather } from './zipcode.type';

import { ELoadingState, IntervalService, LocalStorageService, TKeyValue } from '../shared';


@Injectable()
export class ZipcodeService implements OnDestroy {

  localStorageDataZipcode$: Observable<Record<string, string>> 
    = this._localStorageService.itemsSubject$;
  
  autofilterDataZipcode$:   Observable<TKeyValue<string, string>[]>
    = this._activatedRoute.data
      .pipe(pluck(ZIPCODE_CONSTANT_RESOLVER_COUNTRIES));
  
  isDoneStateZipcodeSubject$:             Observable<boolean> 
    = this._store.select(Selector.isDoneLoadingState);
  isLoadingStateZipcodeSubject$:          Observable<boolean> 
    = this._store.select(Selector.isWorkingLoadingState);
  loadingStateZipcodes$:                  Observable<ELoadingState> 
    = this._store.select(Selector.isLoadingState);
  weathersZipcode$:                       Observable<TWeather[]> 
    = this._store.select(Selector.getWeathers);
  
  private _autoRefreshWeathersZipcode$:   Observable<void> 
    = this._intervalService.interval$
      .pipe(
        switchMapTo(this._localStorageService.itemsSubject$), 
        map((data: Record<string, string>) => void this._store.dispatch(Action.getData({ data })))
      );
  private _autoRefreshWeathersZipcodeSubscription:  Subscription | undefined;

  constructor(
    private _activatedRoute:      ActivatedRoute, 
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
