import { Component } from '@angular/core';
import { TallerService } from 'src/app/services/taller/taller.service';

@Component({
  selector: 'app-taller',
  templateUrl: './taller.component.html',
  styleUrls: ['./taller.component.css']
})
export class TallerComponent {

  talleres: any;

  constructor(private taller: TallerService){

  }

  ngOnInit(){
    this.taller.getallTalleres().subscribe( ( data ) => {
      console.log( data );
      this.talleres = data.data;
    });
  }
}
