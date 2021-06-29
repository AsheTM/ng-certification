import { Inject, Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';

import { SharedModule } from '../shared.module';
import { SHARED_TOKEN_VALUE_STORAGE } from '../shared.provider';
import { TSharedModuleConfigurationStorage } from '../shared.type';


@Injectable({
  providedIn: SharedModule
})
export class LocalStorageService {

  private readonly LOCAL_STORE: Storage = window.localStorage;
  private readonly name:        string  = this.sharedConfigurationStorage.name;

  private _itemsSubject:  BehaviorSubject<string[]> = new BehaviorSubject<string[]>(this._getItems());
  itemsSubject$:          Observable<string[]>      = this._itemsSubject.asObservable();

  constructor(@Inject(SHARED_TOKEN_VALUE_STORAGE) private sharedConfigurationStorage: TSharedModuleConfigurationStorage) { }

  setItem(item: string): void {
    const items:              string[]  = this._getItems();
    const itemsNew:           string[]  = [...new Set([...items, item])];
    const itemsNewStringify:  string    = JSON.stringify(itemsNew);

    this.LOCAL_STORE.setItem(this.name, itemsNewStringify);

    this._itemsSubject.next(itemsNew);
  }

  deleteItem(item: string): boolean {
    const items:                  string[]  = this._getItems();
    const itemsFiltered:          string[]  = items.filter((itm: string) => itm !== item);
    const itemsFilteredStringify: string    = JSON.stringify(itemsFiltered);
    
    this.LOCAL_STORE.setItem(this.name, itemsFilteredStringify);

    this._itemsSubject.next(itemsFiltered);

    return items.length !== itemsFiltered.length;
  }

  private _getItems(): string[] {
    const itemsStringify: string = this.LOCAL_STORE.getItem(this.name);
    
    return JSON.parse(itemsStringify) || [];
  }

}
