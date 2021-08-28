import { ChangeDetectionStrategy, Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { ControlValueAccessor, FormControl } from '@angular/forms';
import { Subscription } from 'rxjs';

import { TKeyValue } from '../../types';


@Component({
  selector:         'app-shared-input',
  templateUrl:      './shared-input.component.html',
  styleUrls:        ['./shared-input.component.css'], 
  changeDetection:  ChangeDetectionStrategy.OnPush
})
export class SharedInputComponent implements ControlValueAccessor, OnChanges, OnDestroy, OnInit {

  @Input()  placeholder?:         string;
  @Input()  autofilter:           TKeyValue<string, unknown>[]  = [];
  @Input()  autofilterMinLength:  number                        = 2;
  @Input()  disabled:             boolean                       = false;
  @Input()  set value(val: string | undefined | null) {
    if(!val) {
      return;
    }

    this.onClickEventHandler(val);
  }

  formControl:  FormControl = new FormControl('');
  
  private _formControlValueChangesSubscription: Subscription | undefined  = undefined;
  private _hide:                                boolean                   = true;
  private _onChange:                            (v: any)  => void         = (_: any)  => {};
  private _onTouched:                           ()        => void         = ()        => {};
  private _dataValueKey:                        Record<string, string>    = {};

  get formControlValue(): string{
    return this.formControl.value || '';
  }
  
  get value(): string {
    return this._dataValueKey[this.formControlValue];
  }

  get show(): boolean {
    return !this.disabled 
      && !this._hide 
      && (this.formControlValue.length > +this.autofilterMinLength || +this.autofilterMinLength === 0);
  }
  
  ngOnChanges({
    autofilter, 
    disabled
  }: SimpleChanges): void {
    if(autofilter) {
      this._dataValueKey = autofilter.currentValue
        .reduce((acc: any, { key, value }: TKeyValue) => ({
          ...acc, 
          [value]: key
        }), {});
    }

    if(disabled) {
      this.formControl[!disabled.currentValue ? 'enable' : 'disable']();
    }
  }

  ngOnInit(): void {
    this._formControlValueChangesSubscription = this.formControl.valueChanges
      .subscribe((value: string) => {
        this._onChange(value);
        this._onTouched();
      });
  }

  ngOnDestroy(): void {
    this._formControlValueChangesSubscription?.unsubscribe();
  }
  
  writeValue(obj: any): void {
    this.formControl.setValue(obj as string);
  }

  registerOnChange(fn: any): void {
    this._onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this._onTouched = fn;
  }

  onFocusEventHandler(): void {
    this._hide = false;
  }

  onBlurEventHandler(): void {
    this._hide = true;
  }

  onClickEventHandler(value: string): void {
    this.formControl.setValue(value);
    this.onBlurEventHandler();
  }

}
