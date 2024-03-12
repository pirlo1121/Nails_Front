import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewTallerComponent } from './new-taller.component';

describe('NewTallerComponent', () => {
  let component: NewTallerComponent;
  let fixture: ComponentFixture<NewTallerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NewTallerComponent]
    });
    fixture = TestBed.createComponent(NewTallerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
