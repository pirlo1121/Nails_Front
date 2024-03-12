import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { ResponseProducts } from '../interfaces/response-products';
import { environment } from 'src/environments/environment.development';
import { Product } from '../interfaces/product';
import {  map, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService { 
  // Atributos
  BASE_URL: string = environment.baseUrl;
  headers: HttpHeaders;
  token: string;

  constructor( private http: HttpClient ) {
    const token = localStorage.getItem( 'token' );
    this.token = token ? token : '';    // ( condicion ) : 'si cumple' ? 'si no cumple'
    this.headers = new HttpHeaders().set( 'X-Token', this.token );
   }

  getAllProducts() {
    return this.http.get<ResponseProducts>( `${ this.BASE_URL }/products` );
  }


  getProductById( id: string ) {

    return this.http.get<ResponseProducts>( `${ this.BASE_URL }/products/${ id }`)
      .pipe(
        tap( data => {
          console.log( data );

          return data;
        }),
        map( product => product.data )
      );
  }

  createProduct( data: Product ) {

    return this.http.post<ResponseProducts>(
      `${ this.BASE_URL }/products`,
      data,
      { headers: this.headers }
    );
  }

  deleteProduct( id: string ) {

    return this.http.delete(
      `${ this.BASE_URL }/products/${ id }`,
      { headers: this.headers }
    );
  }

  updateProduct( id: string, product: Product  ) {

    console.log( id );

    return this.http.patch(
      `${ this.BASE_URL }/products/${ id }`,
      product,
      { headers: this.headers }
    );
  }
}
