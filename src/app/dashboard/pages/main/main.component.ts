import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent {
  


  constructor(
    private authService: AuthService,
    private router: Router
    ) {}

  // Getters
  get user() {
    return this.authService.user;
  }

  logout(){
    localStorage.removeItem('token');
    this.router.navigateByUrl('/');
    window.location.reload();
  }

}
