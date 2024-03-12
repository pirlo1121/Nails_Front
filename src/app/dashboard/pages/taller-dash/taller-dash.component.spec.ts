import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TallerDashComponent } from './taller-dash.component';

describe('TallerDashComponent', () => {
  let component: TallerDashComponent;
  let fixture: ComponentFixture<TallerDashComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TallerDashComponent]
    });
    fixture = TestBed.createComponent(TallerDashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
