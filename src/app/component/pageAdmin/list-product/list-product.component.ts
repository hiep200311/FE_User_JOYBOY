import { Component, OnInit } from '@angular/core';
import { GetAllProductService } from '../../../controller/get-product/get-all-product.service';

@Component({
  selector: 'app-list-product',
  templateUrl: './list-product.component.html',
  styleUrl: './list-product.component.css'
})
export class ListProductComponent implements OnInit{
  products: any[] = [];

  constructor(private getAllProductService: GetAllProductService) {}

  ngOnInit(): void {
    this.getAllProductService.getAllProducts().subscribe((response) => {
      if (response.status === 'OK') {
      this.products = response.data.products;
      }
    });
  }
}

