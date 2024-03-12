import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, MaxLengthValidator, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';
import { ValidateFormsService } from 'src/app/services/validate-forms.service';

@Component({
  selector: 'app-new-product',
  templateUrl: './new-product.component.html',
  styleUrls: ['./new-product.component.css']
})
export class NewProductComponent {
  categories = [
    { name: 'Esmaltes', value: 'Esmaltes' },
    { name: 'Pinceles', value: 'Pinceles' },
    { name: 'Accesorios', value: 'Accesorios' },
    { name: 'Acrilicos', value: 'Acrilicos' }
  ];
  productForm: FormGroup = this.formBuilder.group({
    name: [ '', [ Validators.required, Validators.minLength( 3 ) ] ],
    price: [ '', [ Validators.required, this.validateForm.validatePrice ] ],
    quantity: [ '', [ Validators.required, this.validateForm.validateQuantity ] ],
    urlImage: [ '', this.validateForm.validateNormalUrl ],
    category: [ '' ],
    description: [ '', [ this.validateForm.validateDescription, Validators.maxLength(1500) ] ]
  });

  constructor(
    private formBuilder: FormBuilder,
    private productService: ProductService,
    private router: Router,
    private validateForm: ValidateFormsService
  ) {}


  createProduct() {
    console.log( this.productForm.value );

    this.productService.createProduct( this.productForm.value )
      .subscribe( ( response ) => {
        console.log( response );
      });

    this.productForm.reset();

    setTimeout( () => {
      this.router.navigate( [ 'dashboard', 'products' ] );
    }, 1000 );
  }
}
