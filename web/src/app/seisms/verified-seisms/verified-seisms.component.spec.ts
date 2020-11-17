import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerifiedSeismsComponent } from './verified-seisms.component';

describe('VerifiedSeismsComponent', () => {
  let component: VerifiedSeismsComponent;
  let fixture: ComponentFixture<VerifiedSeismsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VerifiedSeismsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VerifiedSeismsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
