import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CardsComponent } from '../app/components/cards/cards.component';

describe('CardsComponent', () => {
  let component: CardsComponent;
  let fixture: ComponentFixture<CardsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CardsComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call saveStorage method when button is clicked', () => {
    spyOn(component, 'saveStorage');
    const button = fixture.nativeElement.querySelector('.card-btn');
    button.click();
    expect(component.saveStorage).toHaveBeenCalled();
  });

  it('should render product name and description correctly', () => {
    component.products = {
      name: 'Product A',
      description: 'This is a product',
      price: 10,
      urlImage: 'path/to/image'
    };
    fixture.detectChanges();
    const nameElement = fixture.nativeElement.querySelector('h3');
    const descriptionElement = fixture.nativeElement.querySelector('.card-p');
    expect(nameElement.textContent).toContain(component.products.name);
    expect(descriptionElement.textContent).toContain(component.products.description);
  });

  it('should render product price correctly', () => {
    component.products = {
      name: 'Product A',
      description: 'This is a product',
      price: 10,
      urlImage: 'path/to/image'
    };
    fixture.detectChanges();
    const priceElement = fixture.nativeElement.querySelector('.card-price');
    expect(priceElement.textContent).toContain('$10');
  });

  it('should render product image correctly', () => {
    component.products = {
      name: 'Product A',
      description: 'This is a product',
      price: 10,
      urlImage: 'path/to/image'
    };
    fixture.detectChanges();
    const imageElement = fixture.nativeElement.querySelector('.card-img');
    expect(imageElement.src).toContain(component.products.urlImage);
    expect(imageElement.alt).toBe('Nombre del producto');
  });
});
