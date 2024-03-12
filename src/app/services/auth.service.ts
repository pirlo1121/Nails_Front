import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { User } from '../interfaces/user';
import { ResponseAuth } from '../interfaces/response-auth';
import { catchError, map, of, tap } from 'rxjs';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  BASE_URL: string = environment.baseUrl;
  private authData: User | null = null;

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  /** Getter */
  get user() {
    // Evita modificaciones sobre el atributo de la clase "Inmutable"
    return { ...this.authData };
  }


  register( newUser: User ) {
    const URL = `${ this.BASE_URL }/auth/register`;
    // console.log( newUser );         // { name: 'dasdasda', username: 'gc@test.com', password: '123456'}

    // Ver interface <ResponseAuth>
    // {
    //   "ok": true,
    //   "msg": "Usuario registrado exitosamente"
    // }

    return this.http.post<ResponseAuth>( URL, newUser );
  }

  login( credentials: User ) {
    const URL = `${ this.BASE_URL }/auth/login`;

    return this.http.post<ResponseAuth>( URL, credentials )
      .pipe(
        tap( ( response: ResponseAuth ) => {
          localStorage.setItem( 'token', response.token! );

          // this.router.navigateByUrl( '/dashboard' );
          this.router.navigate( [ 'dashboard' ] );
        }),
        map( ( response: ResponseAuth ) => response.ok ),
        catchError( error => {
          return of( false );
        })
      );
  }

  verifyToken() {
    const token = localStorage.getItem( 'token' ) || '';
    const URL = `${ this.BASE_URL }/auth/renew-token`;
    const headers = new HttpHeaders().set( 'x-token', token );

    return this.http.get<ResponseAuth>( URL, { headers } )
      .pipe(
        tap( data => {
          console.log( data );

          // Valida si el usuario esta autenticado y tiene token
          if( data.token ) {
            this.authData = data.userData!;                 // Objeto con el payload (informacion del usuario) para filtrar (role) y mostrar datos (name, username) en los componentes (header)
            localStorage.setItem( 'token', data.token! );   // Actualiza Token guardado en el localStorage
          }
          else {
            this.authData = null;
            localStorage.removeItem( 'token' );
          }

        }),
        map( data => data.ok ),
        catchError( error => {
           return of( false );
        })
      );
  }

}
