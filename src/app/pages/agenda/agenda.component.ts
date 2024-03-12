import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-agenda',
  templateUrl: './agenda.component.html',
  styleUrls: ['./agenda.component.css']
})
export class AgendaComponent implements OnInit {
    serviceName: string = '';
    constructor(private route: ActivatedRoute) {}

    ngOnInit() {
      // Obtener el nombre del servicio de la ruta
      this.serviceName = this.route.snapshot.paramMap.get('serviceName') || '';
    }
}
