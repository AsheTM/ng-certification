import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ZipcodeButtonComponent } from './zipcode-button.component';

describe('ZipcodeButtonComponent', () => {
  let component: ZipcodeButtonComponent;
  let fixture: ComponentFixture<ZipcodeButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ZipcodeButtonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ZipcodeButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
