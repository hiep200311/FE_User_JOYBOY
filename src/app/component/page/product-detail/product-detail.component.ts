import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GetAllProductService } from '../../../controller/get-product/get-all-product.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.css'
})
export class ProductDetailComponent implements OnInit {

  product: any;
  currentImage: string = '';
  currentPrice: number = 0;
  currentDiscountedPrice: number = 0;
  currentDiscount: number = 0;
  baseUrlViewImage: string = 'http://localhost:8888/api/v1/products/images/';

  constructor(
    private route: ActivatedRoute,
    private getAllProductService: GetAllProductService
  ) {}

  ngOnInit(): void {
    this.getProduct();
  }

  getProduct() {
    const productId = this.route.snapshot.paramMap.get('id');
    if (productId) {
      this.getAllProductService.getProductById(productId).subscribe(response => {
        if (response.status === 'OK') {
          this.product = response.data;
          this.currentImage = `${this.baseUrlViewImage}${this.product.thumbnail}`;
          // Select default product attribute to display price
          if (this.product.attributes && this.product.attributes.length > 0) {
            this.changeShowcaseImage(this.product.attributes[0]);
          }
        }
      });
    }
  }

  changeShowcaseImages(imageUrl: string): void {
    this.currentImage = `${this.baseUrlViewImage}${imageUrl}`;
  }

  changeShowcaseImage(attribute: any): void {
    this.currentImage = this.baseUrlViewImage + attribute.image_url;
    this.currentPrice = attribute.price;
    this.currentDiscountedPrice = attribute.discount_price;
    this.currentDiscount = (1 - (attribute.discount_price / attribute.price)) * 100;
  }

  uniqueAttributeTypes(): string[] {
    if (!this.product || !this.product.attributes) {
      return [];
    }
    const attributeTypes = this.product.attributes.map((attribute: any) => attribute.attributeOption.attributeType.attribute_name);
    return Array.from(new Set(attributeTypes));
  }

  filteredAttributes(attributeType: string): any[] {
    if (!this.product || !this.product.attributes) {
      return [];
    }
    return this.product.attributes.filter((attribute: any) => attribute.attributeOption.attributeType.attribute_name === attributeType);
  }
}