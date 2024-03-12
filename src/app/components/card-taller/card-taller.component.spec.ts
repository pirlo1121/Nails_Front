import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardTallerComponent } from './card-taller.component';

describe('CardTallerComponent', () => {
  let component: CardTallerComponent;
  let fixture: ComponentFixture<CardTallerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CardTallerComponent]
    });
    fixture = TestBed.createComponent(CardTallerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
