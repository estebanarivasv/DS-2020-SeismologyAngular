import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewUnverifiedComponent } from './view-unverified.component';

describe('ViewUnverifiedComponent', () => {
  let component: ViewUnverifiedComponent;
  let fixture: ComponentFixture<ViewUnverifiedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewUnverifiedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewUnverifiedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
