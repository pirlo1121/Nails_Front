import { Injectable } from '@angular/core';
import { EventEmitter } from '@angular/core';

/**
 * Servicio de gestión del carrito de compras.
 * 
 * Utiliza EventEmitters para comunicación entre componentes relacionados
 * con el carrito de compras y los modales de visualización.
 * 
 * @class CarritoService
 * @provides 'root' - Inyección en el nivel raíz de la aplicación
 */
@Injectable({
  providedIn: 'root'
})
export class CarritoService {

  /**
   * Constructor del servicio de carrito.
   */
  constructor() { }

  /**
   * EventEmitter para controlar la apertura y cierre de modales.
   * 
   * Emite eventos cuando un modal debe ser mostrado u ocultado,
   * permitiendo la comunicación entre diferentes componentes.
   * 
   * @type {EventEmitter<any>}
   * @example
   * // Para abrir el modal
   * this.carritoService.$modal.emit({ action: 'open', data: productData });
   * 
   * // Para escuchar eventos del modal
   * this.carritoService.$modal.subscribe(data => {
   *   console.log('Evento del modal:', data);
   * });
   */
  $modal = new EventEmitter<any>();

  /**
   * EventEmitter para gestionar eventos del carrito de compras.
   * 
   * Emite eventos cuando se agregan, eliminan o modifican productos en el carrito,
   * permitiendo que múltiples componentes reaccionen a estos cambios.
   * 
   * @type {EventEmitter<any>}
   * @example
   * // Para agregar un producto al carrito
   * this.carritoService.$carr.emit({ action: 'add', product: productData });
   * 
   * // Para escuchar cambios en el carrito
   * this.carritoService.$carr.subscribe(event => {
   *   if (event.action === 'add') {
   *     console.log('Producto agregado:', event.product);
   *   }
   * });
   */
  $carr = new EventEmitter<any>();
}
