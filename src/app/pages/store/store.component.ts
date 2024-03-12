import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/interfaces/product';
import { CarritoService } from 'src/app/services/carrito.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.css']
})
export class StoreComponent implements OnInit {
  products!: Product[];
  shoppingCart: any = [];
  carrito: any = [];
  total: any = 0;
  modal!: boolean;
  carr!: boolean;
  contador = 0;


  constructor(
    private productService: ProductService,
    private carritoService: CarritoService
    )
    {
    console.log( 'hola');

  }
  ngOnInit(): void {
    this.productService.getAllProducts().subscribe(data  => {
      console.log(data);


      this.products = data.data;

      this.carritoService.$modal.subscribe(value =>{
        this.modal = value
      })
      // this.carritoService.$modal.subscribe(data =>{
      //   this.products = data
      // })

    })
  }
  opencarrito(){
    this.modal = true;
  }

  addProduct( product: any ) {
    this.contador +=1;

    if (this.shoppingCart.some((item:any) => item._id === product._id)) {
      if (product.count < product.quantity) {
        product.count +=1;
      } else{
        alert(`solo puede agregar ${product.quantity} articulos al carrito`);
      }

    }
    else{
      product.count = 1
      this.shoppingCart.push( product );
    }


    localStorage.setItem( 'shoppingCart', JSON.stringify( this.shoppingCart ) );
    console.log( 'lista en el carrito >>', this.shoppingCart );
  }

}
