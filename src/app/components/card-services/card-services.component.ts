import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-card-services',
  templateUrl: './card-services.component.html',
  styleUrls: ['./card-services.component.css']
})
export class CardServicesComponent {
  @Input() service: any;

  constructor(private router: Router) {}

  agendarServicio(serviceName: string) {
    // Navegar a la página de Agendamiento con el nombre del servicio
    this.router.navigate(['/agenda-una-cita', serviceName]);
  }
}
