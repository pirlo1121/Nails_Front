import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header-dashboard',
  templateUrl: './header-dashboard.component.html',
  styleUrls: ['./header-dashboard.component.css']
})
export class HeaderDashboardComponent {
  menuVariable: boolean= false;
  menu_icon_variable: boolean=false;

  constructor(private router: Router){}
  
  openMenu() {
    this.menuVariable = !this.menuVariable;
    this.menu_icon_variable= !this.menu_icon_variable;
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigateByUrl('/')
  }

}
