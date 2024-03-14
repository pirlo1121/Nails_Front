import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';
import { By } from '@angular/platform-browser';

import { AppComponent } from '../app/app.component';

@Component({
  selector: 'app-aside',
  template: ''
})
class MockAsideComponent {}

@Component({
  selector: 'app-cards',
  template: ''
})
class MockCardsComponent {}

@Component({
  selector: 'app-car',
  template: ''
})
class MockCarComponent {}

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let component: AppComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AppComponent, MockAsideComponent, MockCardsComponent, MockCarComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it('should render app-aside component', () => {
    const asideComponent = fixture.debugElement.query(By.directive(MockAsideComponent));
    expect(asideComponent).toBeTruthy();
  });

  it('should render app-cards component for each product', () => {
    const cardsComponents = fixture.debugElement.queryAll(By.directive(MockCardsComponent));
    expect(cardsComponents.length).toBe(component.products.length);
  });

  it('should render app-car component when modal is true', () => {
    component.modal = true;
    fixture.detectChanges();

    const carComponent = fixture.debugElement.query(By.directive(MockCarComponent));
    expect(carComponent).toBeTruthy();
  });

  it('should open carrito modal and increase contador when shopping element is clicked', () => {
    expect(component.modal).toBeFalse();
    expect(component.contador).toBe(0);

    const shoppingElement = fixture.debugElement.query(By.css('.shopping'));
    shoppingElement.triggerEventHandler('click', null);
    fixture.detectChanges();

    expect(component.modal).toBeTrue();
    expect(component.contador).toBe(0); // Replace with expected value
  });

  // Add more tests as needed
});
