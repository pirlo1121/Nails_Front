import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  ngAfterViewInit(): void {
    this.toggleMenu();
  }

  private toggleMenu(): void {
    const navbar: HTMLElement | null = document.querySelector('.navbar');
    const burger: HTMLElement | null = document.querySelector('.burger');

    if (burger && navbar) {
      burger.addEventListener('click', (e: Event) => {
        navbar.classList.toggle('show-nav');
      });

      // Bonus
      const navbarLinks: NodeListOf<HTMLAnchorElement> = document.querySelectorAll('.navbar a');
      navbarLinks.forEach(link => {
        link.addEventListener('click', (e: Event) => {
          navbar.classList.toggle('show-nav');
        });
      });
    }
  }
}
