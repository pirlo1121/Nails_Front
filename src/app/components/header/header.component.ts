import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  menuVariable: boolean= false;
  menu_icon_variable: boolean=false;

  
  openMenu() {
    this.menuVariable = !this.menuVariable;
    this.menu_icon_variable= !this.menu_icon_variable;
  }
}