import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Product } from 'src/app/interfaces/product';
import { ResponseProducts } from 'src/app/interfaces/response-products';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.css']
})
export class CardsComponent {
  @Input() products: any;
  @Output() dataProduct = new EventEmitter<any>()



  saveStorage() {
    this.dataProduct.emit( this.products );
    // const a:string = JSON.stringify(this.products.name)
    // localStorage.setItem('car',JSON.stringify(a))
  }

}
