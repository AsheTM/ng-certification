import {
  Component, 
  ChangeDetectionStrategy, 
  HostBinding, 
  Input, 
  ViewEncapsulation, 
  ElementRef, 
  OnChanges, 
  SimpleChanges
} from '@angular/core';


@Component({
  selector:         'app-shared-button',
  template:         `
    <img *ngIf="icon" 
      alt="Icon" 
      [src]="icon" />
    <ng-content></ng-content>
  `, 
  styleUrls:        ['./shared-button.component.css'], 
  encapsulation:    ViewEncapsulation.Emulated, 
  changeDetection:  ChangeDetectionStrategy.OnPush
})
export class SharedButtonComponent implements OnChanges {

  @HostBinding('class')           className:  string                = 'btn btn-primary';
  @HostBinding('style.display')   display:    'inline-flex'         = 'inline-flex';
  @HostBinding('style.flex-flow') flexFlow:   'row-reverse nowrap'  = 'row-reverse nowrap';
  
  @HostBinding('class.disabled')              @Input()  disabled: boolean = false;
  @HostBinding('class.shared-button-done')    @Input()  done:     boolean = false;
  @HostBinding('class.shared-button-loading') @Input()  loading:  boolean = false;

  @Input()  icon: string | undefined;

  @Input('shared-button-done')    doneClassName:    string  = this.defaultDoneClassName;
  @Input('shared-button-loading') loadingClassName: string  = this.defaultLoadingClassName;


  get defaultDoneClassName(): string {
    return 'shared-button-done';
  }

  get defaultLoadingClassName(): string {
    return 'shared-button-loading';
  }

  constructor(private _elementRef: ElementRef<HTMLElement>) { }

  ngOnChanges({ done, loading }: SimpleChanges): void {
    const { nativeElement }: ElementRef<HTMLElement> = this._elementRef;
    
    if(this.doneClassName !== this.defaultDoneClassName) {
      nativeElement.classList
        .remove(this.defaultDoneClassName);
      nativeElement.classList
        [done?.currentValue === true ? 'add' : 'remove'](this.doneClassName);
    }
    
    if(this.loadingClassName !== this.defaultLoadingClassName) {
      nativeElement.classList
        .remove(this.defaultLoadingClassName);
      nativeElement.classList
        [loading?.currentValue === true ? 'add' : 'remove'](this.loadingClassName);
    }
  }

}
