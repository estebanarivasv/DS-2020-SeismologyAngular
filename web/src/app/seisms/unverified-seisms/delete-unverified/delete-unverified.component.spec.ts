import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteUnverifiedComponent } from './delete-unverified.component';

describe('DeleteUnverifiedComponent', () => {
  let component: DeleteUnverifiedComponent;
  let fixture: ComponentFixture<DeleteUnverifiedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteUnverifiedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteUnverifiedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
