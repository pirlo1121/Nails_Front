import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ServiceService } from 'src/app/services/services.service';
import { ValidateFormsService } from 'src/app/services/validate-forms.service';

@Component({
  selector: 'app-new-service',
  templateUrl: './new-service.component.html',
  styleUrls: ['./new-service.component.css']
})
export class NewServiceComponent {
 
  serviceForm: FormGroup = this.formBuilder.group({
    name: [ '', [ Validators.required, Validators.minLength( 3 ) ] ],
    price: [ '', [ Validators.required, this.validateForm.validatePrice ] ],
    urlImage: [ '', this.validateForm.validateNormalUrl ],
    description: [ '', [ this.validateForm.validateDescription ] ]
  });

  constructor(
    private formBuilder: FormBuilder,
    private servicesService: ServiceService,
    private router: Router,
    private validateForm: ValidateFormsService
  ) {}


  createService() {
    console.log( this.serviceForm.value );

    this.servicesService.createService( this.serviceForm.value )
      .subscribe( ( response ) => {
        console.log( response );
      });

    this.serviceForm.reset();

    setTimeout( () => {
      this.router.navigate( [ 'dashboard', 'servicios' ] );
    }, 1000 );
  }
}
