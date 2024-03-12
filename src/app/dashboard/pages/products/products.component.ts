import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/interfaces/product';

import { HttpClient } from '@angular/common/http';
import { ProductService } from 'src/app/services/product.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  // Atributos: Son la forma en que los datos van a estar disponibles para desplegarse en la View Componente
  products!: Product[];
  otherProducts!: Product[];
  totales: any;


  // Constructor: public, private, proteted
  constructor(
    private http: HttpClient,
    private productService: ProductService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadData();
    console.log( this.products );
    
    //this.sumarNumeros();
  }

  loadData() {
    this.productService.getAllProducts().subscribe( data => {
      console.log( data );    // { ok: true, data: [] }
      this.products = data.data;

      console.log( this.products );

      this.calcularPrecioTotalPorProducto();
      this.calcularTotales();
      
    });
  }

  calcularPrecioTotalPorProducto() {

    this.otherProducts = this.products.map( product => {
      console.log( product );
      
      product.total = product.price * product.quantity!;

      return product;
    })

    console.log( this.otherProducts );
    
  }

  calcularTotales() {
    this.totales = this.products.reduce(( accProduct, currentProduct ) => {
      
      accProduct.quantity += currentProduct.quantity!;
      accProduct.total += currentProduct.total!;
      accProduct.price += currentProduct.price!;
      // Asegúrate de mantener otras propiedades del objeto

      return accProduct;
    }, { quantity: 0, total: 0, price: 0 } );

    console.log( this.totales );
    
  }

  // Ciclos de vida

  // Metodos
  update( id: string ) {
    this.router.navigateByUrl( `/dashboard/products/update/${ id }` );
  }

  remove( id: string ) {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success",
        cancelButton: "btn btn-danger"
      },
      buttonsStyling: false
    });
    swalWithBootstrapButtons.fire({
      title: "Estas seguro?",
      text: "Esta accion no se puede revertir!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Si, Eliminalo",
      cancelButtonText: "No, cancelar!",
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        swalWithBootstrapButtons.fire({
          title: "Eliminado!",
          text: "Tu producto ha sido eliminado.",
          icon: "success"
        });

          this.productService.deleteProduct( id ).subscribe( data => {
            console.log( data );

            this.loadData();
          });

      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons.fire({
          title: "Cancelado",
          text: "Tu producto esta seguro :)",
          icon: "error"
        });
      }
    });

  }

}
