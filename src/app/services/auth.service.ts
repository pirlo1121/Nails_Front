import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { User } from '../interfaces/user';
import { ResponseAuth } from '../interfaces/response-auth';
import { catchError, map, of, tap } from 'rxjs';
import { Router } from '@angular/router';

/**
 * Servicio de autenticación del sistema de uñas.
 * 
 * Maneja todos los aspectos relacionados con la autenticación y autorización de usuarios,
 * incluyendo registro, inicio de sesión, verificación de tokens y gestión de sesión.
 * 
 * @class AuthService
 * @requires HttpClient - Para realizar peticiones HTTP al backend
 * @requires Router - Para navegación entre rutas
 * @provides 'root' - Inyección en el nivel raíz de la aplicación
 */
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  /**
   * URL base del API obtenida desde las variables de entorno.
   * @type {string}
   */
  BASE_URL: string = environment.baseUrl;

  /**
   * Datos del usuario autenticado actualmente.
   * @private
   * @type {User | null}
   */
  private authData: User | null = null;

  /**
   * Constructor del servicio de autenticación.
   * 
   * @param {HttpClient} http - Cliente HTTP de Angular para realizar peticiones
   * @param {Router} router - Servicio de enrutamiento de Angular
   */
  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  /**
   * Getter para obtener los datos del usuario autenticado.
   * 
   * Retorna una copia del objeto para evitar modificaciones directas
   * sobre el atributo de la clase, haciéndolo inmutable.
   * 
   * @returns {User} Copia de los datos del usuario autenticado
   * @example
   * const userData = this.authService.user;
   * console.log(userData.name);
   */
  get user() {
    return { ...this.authData };
  }

  /**
   * Registra un nuevo usuario en el sistema.
   * 
   * Envía una petición POST al endpoint /auth/register con los datos
   * del nuevo usuario para crear una cuenta en el sistema.
   * 
   * @param {User} newUser - Objeto con los datos del usuario a registrar
   * @returns {Observable<ResponseAuth>} Observable con la respuesta del servidor
   * @example
   * const newUser: User = {
   *   name: 'María García',
   *   email: 'maria@example.com',
   *   password: 'password123'
   * };
   * this.authService.register(newUser).subscribe(
   *   response => console.log('Usuario registrado:', response)
   * );
   */
  register(newUser: User) {
    const URL = `${this.BASE_URL}/auth/register`;
    return this.http.post<ResponseAuth>(URL, newUser);
  }

  /**
   * Inicia sesión de un usuario en el sistema.
   * 
   * Envía las credenciales al endpoint /auth/login. Si la autenticación es exitosa,
   * guarda el token en localStorage y redirige al dashboard. Maneja errores de
   * autenticación retornando false en caso de fallo.
   * 
   * @param {User} credentials - Credenciales del usuario (email y password)
   * @returns {Observable<boolean>} Observable que emite true si login exitoso, false si falla
   * @example
   * const credentials: User = {
   *   email: 'maria@example.com',
   *   password: 'password123'
   * };
   * this.authService.login(credentials).subscribe(
   *   success => {
   *     if (success) console.log('Sesión iniciada');
   *     else console.log('Credenciales inválidas');
   *   }
   * );
   */
  login(credentials: User) {
    const URL = `${this.BASE_URL}/auth/login`;

    return this.http.post<ResponseAuth>(URL, credentials)
      .pipe(
        // Guardar token y redirigir al dashboard
        tap((response: ResponseAuth) => {
          localStorage.setItem('token', response.token!);
          this.router.navigate(['dashboard']);
        }),
        // Retornar solo el estado de éxito
        map((response: ResponseAuth) => response.ok),
        // Manejar errores de autenticación
        catchError(error => {
          return of(false);
        })
      );
  }

  /**
   * Verifica la validez del token de autenticación almacenado.
   * 
   * Envía el token al endpoint /auth/renew-token para verificar su validez.
   * Si el token es válido, actualiza los datos del usuario y renueva el token.
   * Si el token es inválido o ha expirado, limpia la sesión.
   * 
   * @returns {Observable<boolean>} Observable que emite true si token válido, false si inválido
   * @example
   * this.authService.verifyToken().subscribe(
   *   valid => {
   *     if (valid) console.log('Token válido');
   *     else console.log('Token inválido o expirado');
   *   }
   * );
   */
  verifyToken() {
    const token = localStorage.getItem('token') || '';
    const URL = `${this.BASE_URL}/auth/renew-token`;
    const headers = new HttpHeaders().set('x-token', token);

    return this.http.get<ResponseAuth>(URL, { headers })
      .pipe(
        tap(data => {
          console.log(data);

          // Valida si el usuario está autenticado y tiene token
          if (data.token) {
            // Guardar datos del usuario para uso en componentes (role, name, username)
            this.authData = data.userData!;
            // Actualizar token guardado en localStorage
            localStorage.setItem('token', data.token!);
          }
          else {
            // Limpiar sesión si el token es inválido
            this.authData = null;
            localStorage.removeItem('token');
          }
        }),
        // Retornar solo el estado de validez
        map(data => data.ok),
        // Manejar errores de verificación
        catchError(error => {
          return of(false);
        })
      );
  }
}
