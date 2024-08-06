import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CarComponent } from '../app/components/car/car.component';

describe('CarComponent', () => {
  let component: CarComponent;
  let fixture: ComponentFixture<CarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CarComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render carrito details for each item in carrito array', () => {
    component.carrito = [
      { name: 'Product A', count: 2, price: 10 },
      { name: 'Product B', count: 1, price: 20 }
    ];
    fixture.detectChanges();

    const carritoDetails = fixture.nativeElement.querySelectorAll('.carrito-details');
    expect(carritoDetails.length).toBe(component.carrito.length);

    for (let i = 0; i < component.carrito.length; i++) {
      expect(carritoDetails[i].textContent).toContain(component.carrito[i].name);
      expect(carritoDetails[i].textContent).toContain(component.carrito[i].count);
      expect(carritoDetails[i].textContent).toContain(component.carrito[i].price);
    }
  });

  it('should render total price', () => {
    component.total = 100;
    fixture.detectChanges();

    const totalPrice = fixture.nativeElement.querySelector('.carrito-container p');
    expect(totalPrice.textContent).toContain(component.total);
  });

  it('should call closeCariito method when close button is clicked', () => {
    spyOn(component, 'closeCariito');
    const closeButton = fixture.nativeElement.querySelector('.close-button');
    closeButton.click();
    expect(component.closeCariito).toHaveBeenCalled();
  });

  it('should call cleanCarrito method when clean button is clicked', () => {
    spyOn(component, 'cleanCarrito');
    const cleanButton = fixture.nativeElement.querySelector('.clean-button');
    cleanButton.click();
    expect(component.cleanCarrito).toHaveBeenCalled();
  });

  // Add more tests as needed
});
