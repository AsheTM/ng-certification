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
    this.onClickEventHandler({
      key:    null, 
      value:  val
    });
  }

  hide:         boolean     = false;
  formControl:  FormControl = new FormControl('');
  
  private _formControlValueChangesSubscription: Subscription | undefined  = undefined;
  private _onChange:                            (v: any)  => void         = (_: any)  => {};
  private _onTouched:                           ()        => void         = ()        => {};

  get value(): string {
    return this.formControl.value as string;
  }

  get show(): boolean {
    return !this.disabled && !this.hide && this.value?.length >= this.autofilterMinLength;
  }

  private get _data(): Record<string, unknown> {
    return this.autofilter.reduce((acc: any, { key, value }: TKeyValue) => ({
        ...acc, 
        [value]: key
      }), {});
  }
  
  ngOnChanges({ disabled }: SimpleChanges): void {
    if(disabled) {
      this.formControl[!disabled.currentValue ? 'enable' : 'disable']();
    }
  }

  ngOnInit(): void {
    this._formControlValueChangesSubscription = this.formControl.valueChanges
      .subscribe((value: string) => {
        const data: Record<string, unknown> = this._data;
        
        this.hide = false;
        this._onChange(data[value]);
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
    this.hide = false;
  }

  onBlurEventHandler(): void {
    this.hide = true;
  }

  onClickEventHandler({ key, value }: TKeyValue): void {
    this.formControl.setValue(value);
    this.onBlurEventHandler();
  }

}
