import {
  Component, 
  ChangeDetectionStrategy, 
  HostBinding, 
  Input, 
  ViewEncapsulation, 
  ElementRef, 
  OnChanges, 
  SimpleChanges,
  TemplateRef
} from '@angular/core';

import { ELoadingState } from '../../enums';


@Component({
  selector:         'app-shared-button',
  // ? Uncomment for second approach
  // selector:         'app-shared-button[template-default][template-done][template-loading]',
  template:         `
    <ng-content *ngIf="isDefault"></ng-content>
    <ng-content *ngIf="isDone" 
      select="[done]"></ng-content>
    <ng-content *ngIf="isLoading" 
      select="[working], [loading]"></ng-content>
  `, 
  // ? Uncomment for second approach
  // template:         `
  // <ng-container *ngTemplateOutlet="isDefault ? templateDefault : null"></ng-container>
  // <ng-container *ngTemplateOutlet="isDone ? templateDone : null"></ng-container>
  // <ng-container *ngTemplateOutlet="isLoading ? templateLoading : null"></ng-container>
  // `, 
  styleUrls:        ['./shared-button.component.css'], 
  encapsulation:    ViewEncapsulation.Emulated, 
  changeDetection:  ChangeDetectionStrategy.OnPush
})
export class SharedButtonComponent implements OnChanges {

  @HostBinding('class')                       className:  string                = 'btn btn-primary';
  @HostBinding('style.display')               display:    'inline-flex'         = 'inline-flex';
  @HostBinding('style.flex-flow')             flexFlow:   'row-reverse nowrap'  = 'row-reverse nowrap';
  @HostBinding('class.shared-button-done')    done:       boolean               = false;
  @HostBinding('class.shared-button-loading') loading:    boolean               = false;
  
  @HostBinding('class.disabled')  @Input()  disabled: boolean = false;

  @Input('template-default')      templateDefault:  TemplateRef<unknown>;
  @Input('template-done')         templateDone:     TemplateRef<unknown>;
  @Input('template-loading')      templateLoading:  TemplateRef<unknown>;
  @Input('shared-button-done')    doneClassName:    string                = this.defaultDoneClassName;
  @Input('shared-button-loading') loadingClassName: string                = this.defaultLoadingClassName;
  @Input()                        state:            ELoadingState         = ELoadingState.DEFAULT;

  get defaultDoneClassName(): string {
    return 'shared-button-done';
  }

  get defaultLoadingClassName(): string {
    return 'shared-button-loading';
  }

  get isDefault(): boolean {
    return this.state === ELoadingState.DEFAULT;
  }

  get isDone(): boolean {
    return this.state === ELoadingState.DONE;
  }

  get isLoading(): boolean {
    return this.state === ELoadingState.WORKING;
  }

  constructor(private _elementRef: ElementRef<HTMLElement>) { }

  ngOnChanges({ state }: SimpleChanges): void {
    const { nativeElement }: ElementRef<HTMLElement> = this._elementRef;
    
    if(this.doneClassName !== this.defaultDoneClassName) {
      const method: 'add' | 'remove' = state?.currentValue === ELoadingState.DONE ? 'add' : 'remove';

      nativeElement.classList
        .remove(this.defaultDoneClassName);
      nativeElement.classList
        [method](this.doneClassName);
    } else {
      this.done = state?.currentValue === ELoadingState.DONE;
    }
    
    if(this.loadingClassName !== this.defaultLoadingClassName) {
      const method: 'add' | 'remove' = state?.currentValue === ELoadingState.WORKING ? 'add' : 'remove';

      nativeElement.classList
        .remove(this.defaultLoadingClassName);
      nativeElement.classList
        [method](this.loadingClassName);
    } else {
      this.loading = state?.currentValue === ELoadingState.WORKING;
    }
  }

}
