import { Component } from '@angular/core';

@Component({
  selector: 'app-aside',
  templateUrl: './aside.component.html',
  styleUrls: ['./aside.component.css']
})
export class AsideComponent {


  toggleMenu(): void {
    const asideMenu = document.getElementById('aside-menu') as HTMLDivElement;
    asideMenu.style.display = asideMenu.style.display === 'block' ? 'none' : 'block';
  }

}
