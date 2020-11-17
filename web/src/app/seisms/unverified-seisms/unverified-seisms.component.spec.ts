import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnverifiedSeismsComponent } from './unverified-seisms.component';

describe('UnverifiedSeismsComponent', () => {
  let component: UnverifiedSeismsComponent;
  let fixture: ComponentFixture<UnverifiedSeismsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UnverifiedSeismsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UnverifiedSeismsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
