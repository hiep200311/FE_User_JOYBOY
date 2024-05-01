import { Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  isMenuOpen: boolean = false;

  constructor() { }

  toggleMobileMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }
}
