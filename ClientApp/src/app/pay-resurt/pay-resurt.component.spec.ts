import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PayResurtComponent } from './pay-resurt.component';

describe('PayResurtComponent', () => {
  let component: PayResurtComponent;
  let fixture: ComponentFixture<PayResurtComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PayResurtComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PayResurtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
