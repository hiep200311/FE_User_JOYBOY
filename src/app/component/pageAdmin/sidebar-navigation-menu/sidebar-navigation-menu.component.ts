import { Component, OnInit, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-sidebar-navigation-menu',
  templateUrl: './sidebar-navigation-menu.component.html',
  styleUrl: './sidebar-navigation-menu.component.css'
})
export class SidebarNavigationMenuComponent implements OnInit, AfterViewInit  {
  constructor() { }

  ngOnInit(): void {
   
  }

  ngAfterViewInit(): void {
    this.setupEventListeners();
  }

  private setupEventListeners(): void {
    const arrows = document.querySelectorAll(".arrow");
    arrows.forEach((arrow: Element) => {
      arrow.addEventListener("click", (e: Event) => {
        const target = e.target as HTMLElement;
        const arrowParent = target.parentElement?.parentElement; 
        if (arrowParent) {
          arrowParent.classList.toggle("showMenu");
        }
      });
    });

    const sidebar = document.querySelector(".sidebar");
    const sidebarBtn = document.querySelector(".bx-menu");
    if (sidebarBtn && sidebar) {
      sidebarBtn.addEventListener("click", () => {
        sidebar.classList.toggle("close");
      });
    }
  }
}
