import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GetAllProductService } from '../../../controller/get-product/get-all-product.service';
import { SearchService } from '../../../controller/searchService/searchService';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent  implements OnInit{
  isMenuOpen: boolean = false;
  products: any[] = [];
  keyword: string = '';

  constructor(
    private router: Router,
    private searchService: SearchService,
    private  getAllProductService: GetAllProductService,
  ) { }

  ngOnInit(): void {
  }

  toggleMobileMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }

  navigateBasedOnAuth(): void {
    const token = sessionStorage.getItem('token');
    if (token) {
      this.router.navigate(['/profile']);
    } else {
      this.router.navigate(['/login']);
    }
  }

  search(event: Event): void {
    event.preventDefault();
    if (this.keyword) {
      this.searchService.setKeyword(this.keyword); // Optional: Use the service to store the keyword
      this.router.navigate(['/product'], { queryParams: { keyword: this.keyword } }); // Pass the keyword as a query parameter
    }
  }
  
}