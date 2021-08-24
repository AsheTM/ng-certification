import { Inject, Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';

import { SharedModule } from '../shared.module';
import { SHARED_TOKEN_VALUE_STORAGE } from '../shared.token';
import { TSharedModuleConfigurationStorage } from '../shared.type';


@Injectable({
  providedIn: SharedModule
})
export class LocalStorageService {

  private readonly LOCAL_STORE: Storage = window.localStorage;
  private readonly name:        string  = this.sharedConfigurationStorage.name;

  private _itemsSubject:  BehaviorSubject<Record<string, string>> 
    = new BehaviorSubject<Record<string, string>>(this._getItems());
  itemsSubject$:          Observable<Record<string, string>> 
    = this._itemsSubject.asObservable();

  constructor(
    @Inject(SHARED_TOKEN_VALUE_STORAGE) 
      private sharedConfigurationStorage: TSharedModuleConfigurationStorage
  ) { }

  setItem(item: Record<string, string>): void {
    const items:              Record<string, string>  = this._getItems();
    const newItems:           Record<string, string>  = {
      ...items, 
      ...item
    };
    const newItemsStringify:  string                  = JSON.stringify(newItems);

    this.LOCAL_STORE.setItem(this.name, newItemsStringify);
    this._itemsSubject.next(newItems);
  }

  deleteItem(item: string): boolean {
    const items:    Record<string, string> 
      = this._getItems();
    const newItems: Record<string, string> 
      = { ...items };
    
    delete newItems[item];

    const check:              boolean 
      = Object.entries(items).length !== Object.entries(newItems).length;
    const newItemsStringify:  string
      = JSON.stringify(newItems);
    
    this.LOCAL_STORE.setItem(this.name, newItemsStringify);
    this._itemsSubject.next(newItems);

    return check;
  }

  private _getItems(): Record<string, string> {
    const itemsStringify: string = this.LOCAL_STORE.getItem(this.name);
    
    return JSON.parse(itemsStringify) || {};
  }

}
