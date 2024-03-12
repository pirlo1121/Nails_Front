import { Component } from '@angular/core';
import { Taller } from 'src/app/interfaces/taller';
import { TallerService } from 'src/app/services/taller/taller.service';

@Component({
  selector: 'app-talleres',
  templateUrl: './talleres.component.html',
  styleUrls: ['./talleres.component.css']
})
export class TalleresComponent {
  talleres!: Taller[];

  constructor(private tallerService: TallerService) {
    console.log(tallerService)
  }

}
