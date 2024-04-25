import { Component } from '@angular/core';

@Component({
  selector: 'app-filter-product',
  templateUrl: './filter-product.component.html',
  styleUrls: ['./filter-product.component.css']
})
export class FilterProductComponent {
  ngOnInit(): void {
    this.setupAccordion();
  }

  setupAccordion() {
    const accordionBtns = document.querySelectorAll<HTMLElement>('[data-accordion-btn]');
    const accordions = document.querySelectorAll<HTMLElement>('[data-accordion]');

    for (let i = 0; i < accordionBtns.length; i++) {
      accordionBtns[i].addEventListener('click', function () {
        const clickedBtn = this.nextElementSibling?.classList.contains('active');

        for (let j = 0; j < accordions.length; j++) {
          if (clickedBtn) break;

          if (accordions[j].classList.contains('active')) {
            accordions[j].classList.remove('active');
            accordionBtns[j].classList.remove('active');
          }
        }

        this.nextElementSibling?.classList.toggle('active');
        this.classList.toggle('active');
      });
    }


  }
}
