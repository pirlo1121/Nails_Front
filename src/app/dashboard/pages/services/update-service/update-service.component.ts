import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, map, tap } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { Service } from 'src/app/interfaces/service';
import { ServiceService } from 'src/app/services/services.service';
import { ValidateFormsService } from 'src/app/services/validate-forms.service';

@Component({
  selector: 'app-update-service',
  templateUrl: './update-service.component.html',
  styleUrls: ['./update-service.component.css']
})
export class UpdateServiceComponent implements OnInit {
 
  serviceForm: FormGroup = this.formBuilder.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    price: ['', [Validators.required, this.validateForm.validatePrice]],
    urlImage: ['', this.validateForm.validateNormalUrl],
    description: ['', [this.validateForm.validateDescription]]
  });

  serviceId!: string;

  constructor(
    private formBuilder: FormBuilder,
    private servicesService: ServiceService,
    private router: Router,
    private validateForm: ValidateFormsService,
    private activatedRoute: ActivatedRoute
  ) {}
    
  ngOnInit() {
    this.activatedRoute.params
      .pipe(
        tap(response => {
          console.log(response);
          return response;
        }),
        map((params: any) => params.id)
      )
      .subscribe(id => {
        console.log(id);
        this.serviceId = id; 

        this.servicesService.getServiceById(id).subscribe((data: any) => {
          console.log(data);

          const { name, description, price, urlImage } = data;

          this.serviceForm.setValue({
            name,
            description,
            price,
            urlImage
          });
        });
      });
  }

  updateService() {
    console.log(this.serviceForm.value);

    this.servicesService.updateService(this.serviceId, this.serviceForm.value)
      .subscribe(response => {
        console.log(response);
      });

    this.serviceForm.reset();

    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Producto actualizado',
      showConfirmButton: false,
      timer: 1500
    });

    this.router.navigate(['dashboard', 'servicios']);
  }
}
