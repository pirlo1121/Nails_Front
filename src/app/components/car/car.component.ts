import { Component } from '@angular/core';
import { Product } from 'src/app/interfaces/product';
import { CarritoService } from 'src/app/services/carrito.service';

@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.css']
})
export class CarComponent {
  carrito: any = [];
  aumento: any = 0;
  total: any = 0;

  constructor(
    private carritoService: CarritoService,
    private cleanService: CarritoService
     ){

  }
  ngOnInit(){
    this.car();
  }
  closeCariito(){
    this.carritoService.$modal.emit(false)
  }

  cleanCarrito(){
    localStorage.removeItem('shoppingCart');
    this.carrito = localStorage.getItem('shoppingCart')
    this.carrito = JSON.parse(this.carrito)
    this.total = 0;
    return this.carrito, this.total;
  }

  car(){
    this.carrito = localStorage.getItem('shoppingCart')
    this.carrito = JSON.parse(this.carrito)

    for (let i = 0; i < this.carrito.length; i++) {
      this.carrito[i].price *= this.carrito[i].count;
      this.carrito[i].quantity -= this.carrito[i].count;
      this.total += this.carrito[i].price;
      // this.carrito[i].count += this.aumento;
    }
  }
}
