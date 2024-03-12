import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { TallerDashService } from '../../services/taller-dash.service';
import { Taller } from 'src/app/interfaces/taller';

@Component({
  selector: 'app-taller-dash',
  templateUrl: './taller-dash.component.html',
  styleUrls: ['./taller-dash.component.css']
})
export class TallerDashComponent implements OnInit{
  talleres!: Taller[];
  
  constructor(
    private http: HttpClient,
    private tallerDashService: TallerDashService,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.loadData();
  }
  loadData() {
    this.tallerDashService.getAllTalleres().subscribe( data => {
      console.log(data);
      this.talleres = data.data;
    });
  }


  update( id: string) {
    this.router.navigateByUrl( `/dashboard/products/update/${ id }` );
  }

  remove( id: string) {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success",
        cancelButton: "btn btn-danger"
      },
      buttonsStyling: false
    });
    swalWithBootstrapButtons.fire({
      title: "Estas seguro?",
      text: "Esta accion no se puede revertir!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Si, Eliminalo",
      cancelButtonText: "No, cancelar!",
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        swalWithBootstrapButtons.fire({
          title: "Eliminado!",
          text: "Tu taller ha sido eliminado.",
          icon: "success"
        });

        this.tallerDashService.deleteTaller (id).subscribe( data => {
          console.log( data );
          this.loadData();
        });
      } else if (
        result.dismiss === Swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons.fire({
          title: "Cancelado",
          text: "Tu producto esta seguro :)",
          icon: "error"
        });
      }
    });
  }
}
