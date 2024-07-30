import { Component, OnInit } from '@angular/core';
import { GetAllProductService } from '../../../controller/get-product/get-all-product.service';
import { ActivatedRoute } from '@angular/router';
import { CategoryService } from '../../../controller/category/category.service';
import { BrandService } from '../../../controller/brand/brand.service';

@Component({
  selector: 'app-filter-product',
  templateUrl: './filter-product.component.html',
  styleUrls: ['./filter-product.component.css']
})
export class FilterProductComponent  implements OnInit{
  products: any[] = [];
  categories: any[] = [];
  brands: any[] = [];
  selectedCategories: Set<number> = new Set<number>();
  selectedBrands: Set<number> = new Set<number>(); 
  product: any;
  pageNumber: number = 0;
  pageSize: number = 16;
  totalElements: number = 0;
  totalPages: number = 0;
  keyword: string = '';

  constructor(
    private route: ActivatedRoute,
    private getAllProductService: GetAllProductService,
    private categoryService: CategoryService,
    private brandService:BrandService
  ) {}

  ngOnInit(): void {
   this.search();
   this.category();
   this.brand();
  }

  getProducts(page: number, size: number): void {
    if (this.keyword) {
      this.getAllProductService.searchProducts(this.keyword, page, size).subscribe(response => {
        this.processResponse(response);
      });
    } else {
      this.getAllProductService.getProductPage(page, size).subscribe(response => {
        this.processResponse(response);
      });
    }
  }

  preventDefault(event: Event): void {
    event.preventDefault();
  }

  processResponse(response: any): void {
    this.filterProducts(response.data.products);
    this.pageNumber = response.data.pageNumber;
    this.pageSize = response.data.pageSize;
    this.totalElements = response.data.totalElement;
    this.totalPages = response.data.totalPages;
  }

  goToPage(page: number): void {
    if (page >= 0 && page < this.totalPages) {
      this.pageNumber = page;
      this.getProducts(this.pageNumber, this.pageSize);
    }
  }

  category(): void {
    this.categoryService.getCategories().subscribe(response => {
      if (response.status === 'OK') {
        this.categories = response.data.categories;
      }
    });
  }

  

  getShortDescription(description: string): string {
    if (!description) return '';
    const words = description.split(' ');
    if (words.length > 10) {
      return words.slice(0, 10).join(' ') + '...';
    }
    return description;
  }

  getShortDescription1(description: string): string {
    if (!description) return '';
    const words = description.split(' ');
    if (words.length > 5) {
      return words.slice(0, 5).join(' ') + '...';
    }
    return description;
  }

  onCategoryChange(event: any): void {
    const categoryId = parseInt(event.target.value, 10);
    if (event.target.checked) {
      this.selectedCategories.add(categoryId);
    } else {
      this.selectedCategories.delete(categoryId);
    }
    this.getProducts(this.pageNumber, this.pageSize); // Lọc sản phẩm sau khi thay đổi danh mục
  }


  onBrandChange(event: any): void {
    const brandId = parseInt(event.target.value, 10);
    if (event.target.checked) {
      this.selectedBrands.add(brandId);
    } else {
      this.selectedBrands.delete(brandId);
    }
    this.getProducts(this.pageNumber, this.pageSize); // Filter products after changing brands
  }



  filterProducts(products: any[]): void {
    if (this.selectedCategories.size > 0 || this.selectedBrands.size > 0) {
      this.products = products.filter(product => 
        (this.selectedCategories.size === 0 || this.selectedCategories.has(product.category.id)) &&
        (this.selectedBrands.size === 0 || this.selectedBrands.has(product.brand.id))
      );
    } else {
      this.products = products;
    }
  }



  search(){
    this.route.queryParams.subscribe(params => {
      this.keyword = params['keyword'] || '';
      this.getProducts(this.pageNumber, this.pageSize);
    });
  }

  brand(){
    this.brandService.getAllBrands().subscribe(response => {
      if (response.status === 'OK') {
        this.brands = response.data.brands;
      }
    });
  }

}