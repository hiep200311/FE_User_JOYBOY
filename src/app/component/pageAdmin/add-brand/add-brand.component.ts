import { Component, OnInit } from '@angular/core';
import { BrandService } from '../../../controller/brand/brand.service';
import { CategoryService } from '../../../controller/category/category.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-add-brand',
  templateUrl: './add-brand.component.html',
  styleUrl: './add-brand.component.css'
})
export class AddBrandComponent implements OnInit {
  brands: any[] = [];
  categories: any[] = [];
  brandForm: FormGroup;

  constructor(
    private brandService: BrandService,
    private categoryService: CategoryService,
    private fb: FormBuilder
  ) {
    this.brandForm = this.fb.group({
      brandName: ['', Validators.required],
      categoryId: ['', Validators.required],
      displayType: ['default', Validators.required]
    });
   }

  ngOnInit(): void {
    this.getAllBrands();
    this.getAllCategories();
  }

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString('vi-VN');
  }

  getAllBrands(): void {
    this.brandService.getAllBrands().subscribe(response => {
      if (response.status === 'OK') {
        this.brands = response.data.brands;
      }
    });
  }

  getAllCategories(): void {
    this.categoryService.getCategories().subscribe(response => {
      if (response.status === 'OK') {
        this.categories = response.data.categories;
      }
    });
  }

  onSubmit(): void {
    if (this.brandForm.valid) {
      this.brandService.addBrand(this.brandForm.value).subscribe(response => {
        if (response.status === 'CREATED') {
          alert('Tạo thương hiệu thành công');
          this.brandForm.reset();
          this.getAllBrands(); 
        } else {
          alert('Có lỗi xảy ra. Vui lòng thử lại.');
        }
      }, error => {
        console.error('Error creating brand:', error);
        alert('Có lỗi xảy ra. Vui lòng thử lại.');
      });
    } else {
      alert('Vui lòng điền đầy đủ thông tin');
    }
  }
}