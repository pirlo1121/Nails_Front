import { Component } from '@angular/core';

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
      const span: HTMLElement | null = burger.querySelector('span');
      if (span) {
        span.addEventListener('click', (e: Event) => {
          navbar.classList.toggle('show-nav');
        });
      }

      // Evitamos que el evento del logo afecte al menú
      const logo: HTMLElement | null = document.querySelector('.navbar .logo');
      if (logo) {
        logo.addEventListener('click', (e: Event) => {
          e.stopPropagation(); // Evita que el evento se propague al contenedor principal (nav)
        });
      }

      // Bonus
      const navbarLinks: NodeListOf<HTMLAnchorElement> = document.querySelectorAll('.navbar a');
      navbarLinks.forEach(link => {
        link.addEventListener('click', (e: Event) => {
          navbar.classList.toggle('show-nav');
        });
      });
    }
  }}
