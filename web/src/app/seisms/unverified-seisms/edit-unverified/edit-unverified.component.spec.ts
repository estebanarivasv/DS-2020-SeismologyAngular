import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditUnverifiedComponent } from './edit-unverified.component';

describe('EditUnverifiedComponent', () => {
  let component: EditUnverifiedComponent;
  let fixture: ComponentFixture<EditUnverifiedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditUnverifiedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditUnverifiedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
