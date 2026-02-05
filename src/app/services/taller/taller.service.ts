import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ResponseTalleres } from 'src/app/interfaces/response-talleres';
import { environment } from 'src/environments/environment.development';
import { of, delay } from 'rxjs';
import mockData from 'src/assets/data/mock-data.json';

/**
 * Servicio para la gestión de talleres del sistema de uñas.
 * 
 * Este servicio maneja las operaciones relacionadas con los talleres y cursos
 * educativos ofrecidos, tales como cursos de manicure básico, extensión de uñas,
 * nail art, técnicas avanzadas, emprendimiento y más.
 * 
 * Puede trabajar con datos mock (para desarrollo) o con el backend real,
 * controlado por la variable environment.useMockData.
 * 
 * @class TallerService
 * @requires HttpClient - Para realizar peticiones HTTP al backend
 * @provides 'root' - Inyección en el nivel raíz de la aplicación
 */
@Injectable({
  providedIn: 'root'
})
export class TallerService {

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
   * Array interno de talleres mock.
   * @private
   * @type {any[]}
   */
  private mockTalleres: any[] = [...mockData.talleres];

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
   * Obtiene todos los talleres disponibles en el sistema.
   * 
   * Realiza una petición GET al endpoint /talleres para recuperar
   * el catálogo completo de talleres y cursos educativos ofrecidos.
   * 
   * Si environment.useMockData es true, devuelve datos del JSON mock.
   * 
   * @returns {Observable<ResponseTalleres>} Observable con la respuesta que contiene todos los talleres
   * @example
   * this.tallerService.getallTalleres().subscribe(
   *   response => console.log('Talleres:', response.data)
   * );
   */
  getallTalleres() {
    // Modo Mock: devolver datos del JSON
    if (environment.useMockData) {
      return of({
        ok: true,
        data: this.mockTalleres,
        msg: 'Talleres obtenidos desde mock data'
      } as ResponseTalleres).pipe(
        delay(300) // Simular latencia de red
      );
    }

    // Modo Real: llamada HTTP al backend
    return this.http.get<ResponseTalleres>(this.BASE_URL + '/talleres')
  }
}
