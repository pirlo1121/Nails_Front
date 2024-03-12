import { Component, OnInit } from '@angular/core';
import { Service } from 'src/app/interfaces/service';
import { ServiceService } from 'src/app/services/services.service';

@Component({
  selector: 'app-Services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.css']
})

export class ServicesComponent implements OnInit {
  // Atributos: Son la forma en que los datos van a estar disponibles para desplegarse en la View Componente
  services!: Service[];

  // Constructor: public, private, proteted
  constructor( 
    private ServiceService: ServiceService,
  ) {}
  
  ngOnInit(): void {
    this.ServiceService.getAllServices().subscribe( data => {
      console.log( data );    // { ok: true, data: [] }
      this.services = data.data;
    });
  }

  
    
  }


  // Ciclos de vida

  // Metodos


