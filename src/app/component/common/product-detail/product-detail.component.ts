import { Component, HostListener, OnInit } from '@angular/core';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.css'
})
export class ProductDetailComponent implements OnInit {

  ngOnInit(): void {
    const imgs = document.querySelectorAll('.img-select a');
    const imgBtns = Array.from(imgs);
    let imgId = 1;

    imgBtns.forEach((imgItem: Element) => {
      imgItem.addEventListener('click', (event: Event) => {
        event.preventDefault();
        imgId = parseInt((imgItem as HTMLElement).dataset['id'] || "1", 10);
        slideImage();
      });
    });

    function slideImage(): void {
      const displayWidth: number = (document.querySelector('.img-showcase img:first-child') as HTMLImageElement).clientWidth;

      (document.querySelector('.img-showcase') as HTMLElement).style.transform = `translateX(${- (imgId - 1) * displayWidth}px)`;
    }

    window.addEventListener('resize', slideImage);
  }

}