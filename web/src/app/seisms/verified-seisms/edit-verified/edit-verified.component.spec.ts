import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditVerifiedComponent } from './edit-verified.component';

describe('EditVerifiedComponent', () => {
  let component: EditVerifiedComponent;
  let fixture: ComponentFixture<EditVerifiedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditVerifiedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditVerifiedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
