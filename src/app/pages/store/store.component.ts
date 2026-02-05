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
  products: Product[] = [];
  filteredProducts: Product[] = [];
  shoppingCart: any = [];
  carrito: any = [];
  total: any = 0;
  modal!: boolean;
  carr!: boolean;
  contador = 0;
  searchTerm: string = '';
  isLoading: boolean = true;
  hasError: boolean = false;


  constructor(
    private productService: ProductService,
    private carritoService: CarritoService
  ) {
    console.log('hola');

  }
  ngOnInit(): void {
    this.isLoading = true;
    this.productService.getAllProducts().subscribe({
      next: (data) => {
        console.log(data);
        this.products = data.data;
        this.filteredProducts = this.products;
        this.isLoading = false;
        this.hasError = false;
      },
      error: (error) => {
        console.error('Error loading products:', error);
        this.isLoading = false;
        this.hasError = true;
        // Set some mock data for demonstration when backend is not available
        this.products = [];
        this.filteredProducts = [];
      }
    });

    this.carritoService.$modal.subscribe(value => {
      this.modal = value
    })
  }

  onSearchChange(searchTerm: string) {
    this.searchTerm = searchTerm.toLowerCase();

    if (!this.searchTerm) {
      this.filteredProducts = this.products;
    } else {
      this.filteredProducts = this.products.filter(product =>
        product.name.toLowerCase().includes(this.searchTerm) ||
        (product.description && product.description.toLowerCase().includes(this.searchTerm)) ||
        (product.category && product.category.toLowerCase().includes(this.searchTerm))
      );
    }
  }

  opencarrito() {
    this.modal = true;
  }

  addProduct(product: any) {
    this.contador += 1;

    if (this.shoppingCart.some((item: any) => item._id === product._id)) {
      if (product.count < product.quantity) {
        product.count += 1;
      } else {
        alert(`solo puede agregar ${product.quantity} articulos al carrito`);
      }

    }
    else {
      product.count = 1
      this.shoppingCart.push(product);
    }


    localStorage.setItem('shoppingCart', JSON.stringify(this.shoppingCart));
    console.log('lista en el carrito >>', this.shoppingCart);
  }

}

