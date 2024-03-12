import { Injectable } from '@angular/core';
import { EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CarritoService {

  constructor() { }

  $modal = new EventEmitter<any>();
  $carr = new EventEmitter<any>();
}
