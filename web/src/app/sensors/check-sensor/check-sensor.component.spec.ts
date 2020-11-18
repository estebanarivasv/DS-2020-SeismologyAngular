import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckSensorComponent } from './check-sensor.component';

describe('CheckSensorComponent', () => {
  let component: CheckSensorComponent;
  let fixture: ComponentFixture<CheckSensorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CheckSensorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckSensorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
