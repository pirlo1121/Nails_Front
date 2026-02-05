import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { ResponseProducts } from '../interfaces/response-products';
import { environment } from 'src/environments/environment.development';
import { Product } from '../interfaces/product';
import { map, tap, of, delay, Observable } from 'rxjs';
import mockData from 'src/assets/data/mock-data.json';

/**
 * Servicio para la gestión de productos del sistema de uñas.
 * 
 * Este servicio maneja todas las operaciones CRUD (Crear, Leer, Actualizar, Eliminar)
 * relacionadas con los productos disponibles en la tienda, incluyendo esmaltes,
 * herramientas, kits y accesorios para manicure y pedicure.
 * 
 * Puede trabajar con datos mock (para desarrollo) o con el backend real,
 * controlado por la variable environment.useMockData.
 * 
 * @class ProductService
 * @requires HttpClient - Para realizar peticiones HTTP al backend
 * @provides 'root' - Inyección en el nivel raíz de la aplicación
 */
@Injectable({
  providedIn: 'root'
})
export class ProductService {

  /**
   * URL base del API obtenida desde las variables de entorno.
   * @type {string}
   */
  BASE_URL: string = environment.baseUrl;

  /**
   * Headers HTTP que incluyen el token de autenticación.
   * @type {HttpHeaders}
   */
  headers: HttpHeaders;

  /**
   * Token de autenticación del usuario almacenado en localStorage.
   * @type {string}
   */
  token: string;

  /**
   * Array interno de productos mock para operaciones CRUD en memoria.
   * @private
   * @type {Product[]}
   */
  private mockProducts: Product[] = [...mockData.products as Product[]];

  /**
   * Constructor del servicio que inicializa los headers con el token de autenticación.
   * 
   * @param {HttpClient} http - Cliente HTTP de Angular para realizar peticiones
   */
  constructor(private http: HttpClient) {
    // Obtener el token del localStorage
    const token = localStorage.getItem('token');
    this.token = token ? token : '';

    // Configurar headers con el token para autenticación
    this.headers = new HttpHeaders().set('X-Token', this.token);
  }

  /**
   * Obtiene todos los productos disponibles en el sistema.
   * 
   * Realiza una petición GET al endpoint /products sin necesidad de autenticación
   * para recuperar el catálogo completo de productos.
   * 
   * Si environment.useMockData es true, devuelve datos del JSON mock.
   * 
   * @returns {Observable<ResponseProducts>} Observable con la respuesta que contiene todos los productos
   * @example
   * this.productService.getAllProducts().subscribe(
   *   response => console.log('Productos:', response.data)
   * );
   */
  getAllProducts() {
    // Modo Mock: devolver datos del JSON
    if (environment.useMockData) {
      return of({
        ok: true,
        data: this.mockProducts,
        msg: 'Productos obtenidos desde mock data'
      } as ResponseProducts).pipe(
        delay(300) // Simular latencia de red
      );
    }

    // Modo Real: llamada HTTP al backend
    return this.http.get<ResponseProducts>(`${this.BASE_URL}/products`);
  }

  /**
   * Obtiene un producto específico por su ID.
   * 
   * Realiza una petición GET al endpoint /products/:id y transforma la respuesta
   * para devolver únicamente los datos del producto sin el wrapper de respuesta.
   * 
   * Si environment.useMockData es true, busca en datos mock.
   * 
   * @param {string} id - ID único del producto a buscar
   * @returns {Observable<any>} Observable con los datos del producto encontrado
   * @example
   * this.productService.getProductById('prod001').subscribe(
   *   product => console.log('Producto:', product)
   * );
   */
  getProductById(id: string): Observable<any> {
    // Modo Mock: buscar en array mock
    if (environment.useMockData) {
      const product = this.mockProducts.find(p => p._id === id);
      return of(product!).pipe(
        delay(200)
      );
    }

    // Modo Real: llamada HTTP al backend
    return this.http.get<ResponseProducts>(`${this.BASE_URL}/products/${id}`)
      .pipe(
        // Log de la respuesta para debugging
        tap(data => {
          console.log(data);
          return data;
        }),
        // Extraer solo los datos del producto de la respuesta
        map(product => product.data)
      );
  }

  /**
   * Crea un nuevo producto en el sistema.
   * 
   * Realiza una petición POST al endpoint /products con los datos del producto.
   * Requiere autenticación mediante token en los headers.
   * 
   * Si environment.useMockData es true, agrega al array mock con un ID generado.
   * 
   * @param {Product} data - Objeto con toda la información del producto a crear
   * @returns {Observable<ResponseProducts>} Observable con la respuesta del servidor
   * @throws {HttpErrorResponse} Error si el token es inválido o faltan datos requeridos
   * @example
   * const newProduct: Product = {
   *   name: 'Esmalte Rojo',
   *   price: 45000,
   *   category: 'Esmaltes',
   *   ...
   * };
   * this.productService.createProduct(newProduct).subscribe(
   *   response => console.log('Producto creado:', response)
   * );
   */
  createProduct(data: Product) {
    // Modo Mock: agregar al array mock
    if (environment.useMockData) {
      const newProduct: Product = {
        ...data,
        _id: `prod${Date.now()}`, // Generar ID único
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        __v: 0
      };
      this.mockProducts.push(newProduct);

      return of({
        ok: true,
        data: [newProduct],
        msg: 'Producto creado exitosamente (mock)'
      } as ResponseProducts).pipe(
        delay(400)
      );
    }

    // Modo Real: llamada HTTP al backend
    return this.http.post<ResponseProducts>(
      `${this.BASE_URL}/products`,
      data,
      { headers: this.headers }
    );
  }

  /**
   * Elimina un producto del sistema por su ID.
   * 
   * Realiza una petición DELETE al endpoint /products/:id.
   * Requiere autenticación mediante token en los headers.
   * Solo usuarios autorizados pueden eliminar productos.
   * 
   * Si environment.useMockData es true, elimina del array mock.
   * 
   * @param {string} id - ID único del producto a eliminar
   * @returns {Observable<any>} Observable con la respuesta de confirmación
   * @throws {HttpErrorResponse} Error si el token es inválido o el producto no existe
   * @example
   * this.productService.deleteProduct('prod001').subscribe(
   *   () => console.log('Producto eliminado exitosamente')
   * );
   */
  deleteProduct(id: string) {
    // Modo Mock: filtrar del array mock
    if (environment.useMockData) {
      const index = this.mockProducts.findIndex(p => p._id === id);
      if (index !== -1) {
        this.mockProducts.splice(index, 1);
        return of({
          ok: true,
          msg: 'Producto eliminado exitosamente (mock)'
        }).pipe(delay(300));
      } else {
        return of({
          ok: false,
          msg: 'Producto no encontrado'
        }).pipe(delay(300));
      }
    }

    // Modo Real: llamada HTTP al backend
    return this.http.delete(
      `${this.BASE_URL}/products/${id}`,
      { headers: this.headers }
    );
  }

  /**
   * Actualiza la información de un producto existente.
   * 
   * Realiza una petición PATCH al endpoint /products/:id con los datos actualizados.
   * Requiere autenticación mediante token en los headers.
   * Solo se actualizan los campos enviados en el objeto product.
   * 
   * Si environment.useMockData es true, actualiza el objeto en el array mock.
   * 
   * @param {string} id - ID único del producto a actualizar
   * @param {Product} product - Objeto con los datos del producto a modificar
   * @returns {Observable<any>} Observable con la respuesta del servidor
   * @throws {HttpErrorResponse} Error si el token es inválido o el producto no existe
   * @example
   * const updatedData: Product = {
   *   price: 50000,
   *   quantity: 100
   * };
   * this.productService.updateProduct('prod001', updatedData).subscribe(
   *   response => console.log('Producto actualizado:', response)
   * );
   */
  updateProduct(id: string, product: Product) {
    console.log(id);

    // Modo Mock: actualizar en array mock
    if (environment.useMockData) {
      const index = this.mockProducts.findIndex(p => p._id === id);
      if (index !== -1) {
        this.mockProducts[index] = {
          ...this.mockProducts[index],
          ...product,
          updatedAt: new Date().toISOString()
        };
        return of({
          ok: true,
          data: [this.mockProducts[index]],
          msg: 'Producto actualizado exitosamente (mock)'
        }).pipe(delay(300));
      } else {
        return of({
          ok: false,
          msg: 'Producto no encontrado'
        }).pipe(delay(300));
      }
    }

    // Modo Real: llamada HTTP al backend
    return this.http.patch(
      `${this.BASE_URL}/products/${id}`,
      product,
      { headers: this.headers }
    );
  }
}
