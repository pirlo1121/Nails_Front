import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

import Swal from 'sweetalert2';

import { ServiceService } from 'src/app/services/services.service';
import { Service } from 'src/app/interfaces/service';



@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.css']
})
export class ServicesComponent implements OnInit{
  services! : Service[];

  constructor(
    private router:Router,
    private http:HttpClient,
    public serviceService:ServiceService
    ) {}

    ngOnInit(): void{
      this.loadData();
    }

    loadData(){
      this.serviceService.getAllServices().subscribe(data => {
        console.log(data);
        this.services = data.data;
      })
    }

    updateServiceButton(id: string){
      this.router.navigateByUrl(`/dashboard/servicios/update/${ id }`);
    }

    removeServiceButton( id: string ){

      const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
          confirmButton: 'btn btn-success',
          cancelButton: 'btn btn-danger'
        },
        buttonsStyling: false
      });

      swalWithBootstrapButtons.fire({
        title: '<strong>¿Está seguro de eliminar este servicio?</strong>',
        text: "Esta accion no se puede revertir",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Si, Eliminar',
        cancelButtonAriaLabel: 'No, Cancelar',
        reverseButtons: true
      }).then((result) => {
        if (result.isConfirmed) {
          swalWithBootstrapButtons.fire({
            title: "Servicio eliminado",
            text: "El servicio ha sido eliminado exitosamente.",
            icon: "success"
          });

          this.serviceService.deleteService(id).subscribe(data=>{
            console.log(data);

            this.loadData();
          });

        }else if(
          result.dismiss === Swal.DismissReason.cancel
        ){
          swalWithBootstrapButtons.fire({
            title: "<strong>Operación cancelada </strong>",
            text: "La operacion fue cancelada.",
            icon: "error"
          })
        }
      })

    }
  
}
