import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.css'
})
export class ProductDetailComponent implements OnInit {

  @ViewChild('showcaseImg') showcaseImg!: ElementRef<HTMLImageElement>;

  ngOnInit(): void {
  }

  changeShowcaseImage(event: MouseEvent): void {
    const target = event.target as HTMLImageElement;
    if (target.tagName === 'IMG') {
      this.showcaseImg.nativeElement.src = target.src;
    }
  }

}