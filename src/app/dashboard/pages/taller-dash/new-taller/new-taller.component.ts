import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TallerService } from 'src/app/services/taller.service';
import { ValidateFormsService } from 'src/app/services/validate-forms.service';

@Component({
  selector: 'app-new-taller',
  templateUrl: './new-taller.component.html',
  styleUrls: ['./new-taller.component.css']
})
export class NewTallerComponent {
  tallerForm: FormGroup = this.formBuilder.group({
    name: [ '', [ Validators.required, Validators.minLength( 3 ) ] ],
    price: [ '', [ Validators.required, this.validateForm.validatePrice ] ],
    urlImage: [ '', this.validateForm.validateNormalUrl ],
    description: [ '', [ this.validateForm.validateDescription ] ]
  });

  constructor(
    private formBuilder: FormBuilder,
    private TallerService: TallerService,
    private router: Router,
    private validateForm: ValidateFormsService
  ) {}

  createTaller() {
    console.log( this.tallerForm.value);

    this.TallerService.createTaller( this.tallerForm.value )
      .subscribe(( response ) => {
        console.log( response );
      });
    this.tallerForm.reset();

    setTimeout( () => {
      this.router.navigate( [ 'dashboard', 'talleres']);
    }, 1000 );
  }
}
