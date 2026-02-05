import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { ResponseServices } from '../interfaces/response-services';
import { environment } from 'src/environments/environment.development';
import { Service } from '../interfaces/service';
import { map, tap, of, delay, Observable } from 'rxjs';
import mockData from 'src/assets/data/mock-data.json';

/**
 * Servicio para la gestión de servicios del sistema de uñas.
 * 
 * Este servicio maneja todas las operaciones CRUD (Crear, Leer, Actualizar, Eliminar)
 * relacionadas con los servicios ofrecidos en el salón, tales como manicure, pedicure,
 * extensiones de uñas, nail art, tratamientos especiales, entre otros.
 * 
 * Puede trabajar con datos mock (para desarrollo) o con el backend real,
 * controlado por la variable environment.useMockData.
 * 
 * @class ServiceService
 * @requires HttpClient - Para realizar peticiones HTTP al backend
 * @provides 'root' - Inyección en el nivel raíz de la aplicación
 */
@Injectable({
  providedIn: 'root'
})
export class ServiceService {

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
   * Array interno de servicios mock para operaciones CRUD en memoria.
   * @private
   * @type {Service[]}
   */
  private mockServices: Service[] = [...mockData.services as Service[]];

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
    this.headers = new HttpHeaders().set('x-token', this.token);
  }

  /**
   * Obtiene todos los servicios disponibles en el sistema.
   * 
   * Realiza una petición GET al endpoint /services con autenticación
   * para recuperar el catálogo completo de servicios ofrecidos.
   * 
   * Si environment.useMockData es true, devuelve datos del JSON mock.
   * 
   * @returns {Observable<ResponseServices>} Observable con la respuesta que contiene todos los servicios
   * @example
   * this.serviceService.getAllServices().subscribe(
   *   response => console.log('Servicios:', response.data)
   * );
   */
  getAllServices() {
    // Modo Mock: devolver datos del JSON
    if (environment.useMockData) {
      return of({
        ok: true,
        data: this.mockServices,
        msg: 'Servicios obtenidos desde mock data'
      } as ResponseServices).pipe(
        delay(300) // Simular latencia de red
      );
    }

    // Modo Real: llamada HTTP al backend
    return this.http.get<ResponseServices>(`${this.BASE_URL}/services`, { headers: this.headers })
  }

  /**
   * Obtiene un servicio específico por su ID.
   * 
   * Realiza una petición GET al endpoint /services/:id y transforma la respuesta
   * para devolver únicamente los datos del servicio sin el wrapper de respuesta.
   * 
   * Si environment.useMockData es true, busca en datos mock.
   * 
   * @param {string} id - ID único del servicio a buscar
   * @returns {Observable<any>} Observable con los datos del servicio encontrado
   * @example
   * this.serviceService.getServiceById('serv001').subscribe(
   *   service => console.log('Servicio:', service)
   * );
   */
  getServiceById(id: string): Observable<any> {
    // Modo Mock: buscar en array mock
    if (environment.useMockData) {
      const service = this.mockServices.find(s => s._id === id);
      return of(service!).pipe(
        delay(200)
      );
    }

    // Modo Real: llamada HTTP al backend
    return this.http.get<ResponseServices>(`${this.BASE_URL}/services/${id}`)
      .pipe(
        // Log de la respuesta para debugging
        tap(data => {
          console.log(data);
          return data;
        }),
        // Extraer solo los datos del servicio de la respuesta
        map(Service => Service.data)
      );
  }

  /**
   * Crea un nuevo servicio en el sistema.
   * 
   * Realiza una petición POST al endpoint /services con los datos del servicio.
   * Requiere autenticación mediante token en los headers.
   * 
   * Si environment.useMockData es true, agrega al array mock con un ID generado.
   * 
   * @param {Service} data - Objeto con toda la información del servicio a crear
   * @returns {Observable<ResponseServices>} Observable con la respuesta del servidor
   * @throws {HttpErrorResponse} Error si el token es inválido o faltan datos requeridos
   * @example
   * const newService: Service = {
   *   name: 'Manicure Spa',
   *   description: 'Tratamiento completo de manicure',
   *   price: 55000,
   *   urlImage: 'https://...',
   *   userId: 'user123',
   *   _id: 'serv999'
   * };
   * this.serviceService.createService(newService).subscribe(
   *   response => console.log('Servicio creado:', response)
   * );
   */
  createService(data: Service) {
    // Modo Mock: agregar al array mock
    if (environment.useMockData) {
      const newService: Service = {
        ...data,
        _id: `serv${Date.now()}` // Generar ID único
      };
      this.mockServices.push(newService);

      return of({
        ok: true,
        data: [newService],
        msg: 'Servicio creado exitosamente (mock)'
      } as ResponseServices).pipe(
        delay(400)
      );
    }

    // Modo Real: llamada HTTP al backend
    return this.http.post<ResponseServices>(
      `${this.BASE_URL}/services`,
      data,
      { headers: this.headers }
    );
  }

  /**
   * Elimina un servicio del sistema por su ID.
   * 
   * Realiza una petición DELETE al endpoint /services/:id.
   * Requiere autenticación mediante token en los headers.
   * Solo usuarios autorizados pueden eliminar servicios.
   * 
   * Si environment.useMockData es true, elimina del array mock.
   * 
   * @param {string} id - ID único del servicio a eliminar
   * @returns {Observable<any>} Observable con la respuesta de confirmación
   * @throws {HttpErrorResponse} Error si el token es inválido o el servicio no existe
   * @example
   * this.serviceService.deleteService('serv001').subscribe(
   *   () => console.log('Servicio eliminado exitosamente')
   * );
   */
  deleteService(id: string) {
    // Modo Mock: filtrar del array mock
    if (environment.useMockData) {
      const index = this.mockServices.findIndex(s => s._id === id);
      if (index !== -1) {
        this.mockServices.splice(index, 1);
        return of({
          ok: true,
          msg: 'Servicio eliminado exitosamente (mock)'
        }).pipe(delay(300));
      } else {
        return of({
          ok: false,
          msg: 'Servicio no encontrado'
        }).pipe(delay(300));
      }
    }

    // Modo Real: llamada HTTP al backend
    return this.http.delete(
      `${this.BASE_URL}/services/${id}`,
      { headers: this.headers }
    );
  }

  /**
   * Actualiza la información de un servicio existente.
   * 
   * Realiza una petición PATCH al endpoint /services/:id con los datos actualizados.
   * Requiere autenticación mediante token en los headers.
   * Solo se actualizan los campos enviados en el objeto Service.
   * 
   * Si environment.useMockData es true, actualiza el objeto en el array mock.
   * 
   * @param {string} id - ID único del servicio a actualizar
   * @param {Service} Service - Objeto con los datos del servicio a modificar
   * @returns {Observable<any>} Observable con la respuesta del servidor
   * @throws {HttpErrorResponse} Error si el token es inválido o el servicio no existe
   * @example
   * const updatedData: Service = {
   *   price: 60000,
   *   description: 'Nueva descripción mejorada'
   * };
   * this.serviceService.updateService('serv001', updatedData).subscribe(
   *   response => console.log('Servicio actualizado:', response)
   * );
   */
  updateService(id: string, Service: Service) {
    console.log(id);

    // Modo Mock: actualizar en array mock
    if (environment.useMockData) {
      const index = this.mockServices.findIndex(s => s._id === id);
      if (index !== -1) {
        this.mockServices[index] = {
          ...this.mockServices[index],
          ...Service
        };
        return of({
          ok: true,
          data: [this.mockServices[index]],
          msg: 'Servicio actualizado exitosamente (mock)'
        }).pipe(delay(300));
      } else {
        return of({
          ok: false,
          msg: 'Servicio no encontrado'
        }).pipe(delay(300));
      }
    }

    // Modo Real: llamada HTTP al backend
    return this.http.patch(
      `${this.BASE_URL}/services/${id}`,
      Service,
      { headers: this.headers }
    );
  }
}