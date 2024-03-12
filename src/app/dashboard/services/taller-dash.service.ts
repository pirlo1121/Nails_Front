import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { ResponseTalleres } from 'src/app/interfaces/response-talleres';
import { Taller } from 'src/app/interfaces/taller';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class TallerDashService {

  BASE_URL: string = environment.baseUrl;
  headers: HttpHeaders;
  token: string;

  constructor(
    private http: HttpClient
  ) {
    const token = localStorage.getItem( 'token' );
    this.token = token ? token : '';
    this.headers = new HttpHeaders().set( 'X-Token', this.token );
   }

  createTaller( data: Taller) {
    // const data = inputDataForm.value;

    return this.http.post<Taller>( `${ this.BASE_URL }/talleres`, data,
    { headers: this.headers }
    );
  }

  getAllTalleres() {
    return this.http.get<ResponseTalleres>( `${ this.BASE_URL }/talleres` );
  }

  deleteTaller( id: string ) {

    return this.http.delete(`${ this.BASE_URL }/talleres/${ id }`, { headers: this.headers });
  }
}
