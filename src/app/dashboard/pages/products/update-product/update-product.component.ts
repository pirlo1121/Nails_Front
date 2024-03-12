import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, map, of, tap } from 'rxjs';
import { Product } from 'src/app/interfaces/product';
import { ProductService } from 'src/app/services/product.service';
import { ValidateFormsService } from 'src/app/services/validate-forms.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-product',
  templateUrl: './update-product.component.html',
  styleUrls: ['./update-product.component.css']
})
export class UpdateProductComponent {
  categories = [
    { name: 'Tecnologia', value: 'tecnologia' },
    { name: 'Hogar', value: 'hogar' },
    { name: 'Verduras', value: 'verduras' },
    { name: 'Frutas', value: 'frutas' }
  ];
  productForm: FormGroup = this.formBuilder.group({
    name: [ '', [ Validators.required, Validators.minLength( 3 ) ] ],
    price: [ '', [ Validators.required, this.validateForm.validatePrice ] ],
    quantity: [ '', [ Validators.required, this.validateForm.validateQuantity ] ],
    urlImage: [ '', this.validateForm.validateNormalUrl ],
    category: [ '' ],
    description: [ '', [ this.validateForm.validateDescription ] ]
  });
  productId!: string;


  constructor(
    private formBuilder: FormBuilder,
    private productService: ProductService,
    private router: Router,
    private validateForm: ValidateFormsService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.activatedRoute.params
      .pipe(
        tap( response => {
          console.log( response );

          return response;
        }),
        map( response => response[ 'id' ] )
      ).subscribe( id  => {
        console.log( id );      /// Extraemos de la URL

        this.productId = id;

        this.productService.getProductById( id ).subscribe( ( data: any ) => {
          console.log( data );

          const { name, description, price, quantity, urlImage, category } = data;

          this.productForm.setValue({
            name,
            description,
            price,
            quantity,
            urlImage,
            category
          });
        })
      });

  }

  updateProduct() {
    console.log( this.productForm.value );

    this.productService.updateProduct( this.productId, this.productForm.value )
      .subscribe( data => {
        console.log( data );

        this.productForm.reset();

        Swal.fire({
          position: "center",
          icon: "success",
          title: "Producto actualizado",
          showConfirmButton: false,
          timer: 1500
        });

        this.router.navigate( [ 'dashboard', 'products' ] );   //  /dashboard/products
      });
  }
}
