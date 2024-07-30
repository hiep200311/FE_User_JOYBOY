import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CategoryService } from '../../../controller/category/category.service';
import { BrandService } from '../../../controller/brand/brand.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GetAllProductService } from '../../../controller/get-product/get-all-product.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrl: './add-product.component.css'
})
export class AddProductComponent  implements OnInit,  AfterViewInit{
  @ViewChild('productImagesInput') productImagesInput!: ElementRef<HTMLInputElement>;
  @ViewChild('thumbnailsContainer') thumbnailsContainer!: ElementRef<HTMLDivElement>;
  @ViewChild('imageGrid') imageGrid!: ElementRef<HTMLDivElement>;

  ngAfterViewInit(): void {
    const inputElement = this.productImagesInput.nativeElement;
    const thumbnailsElement = this.thumbnailsContainer.nativeElement;
    const imageGridElement = this.imageGrid.nativeElement;

    // Handle file input for thumbnails
    inputElement.addEventListener('change', (event: Event) => {
      const target = event.target as HTMLInputElement;
      const files = target.files;

      if (files) {
        thumbnailsElement.innerHTML = ''; // Clear current thumbnails

        Array.from(files).forEach(file => {
          const reader = new FileReader();
          reader.onload = (e: ProgressEvent<FileReader>) => {
            const thumbnail = document.createElement('div');
            thumbnail.classList.add('thumbnail');
            const img = document.createElement('img');
            img.src = e.target?.result as string;

            // Set fixed size for image
            img.style.width = '150px';  // Set width
            img.style.height = '150px'; // Set height
            img.style.objectFit = 'cover'; // Maintain aspect ratio, cover the box

            thumbnail.appendChild(img);

            const removeButton = document.createElement('button');
            removeButton.classList.add('remove-button');
            removeButton.textContent = 'x';
            removeButton.addEventListener('click', () => {
              thumbnail.remove();
            });

            thumbnail.appendChild(removeButton);
            thumbnailsElement.appendChild(thumbnail);
          };
          reader.readAsDataURL(file);
        });
      }
    });

    // Initialize existing image grid
    this.initImageGrid();
  }

  private initImageGrid(): void {
    const imageItems = this.imageGrid.nativeElement.querySelectorAll('.image-item');

    imageItems.forEach((item: Element) => {
      const imageItem = item as HTMLElement;
      const img = imageItem.querySelector('img') as HTMLImageElement;

      if (img) {
        // Set fixed size for existing images
        img.style.width = '150px';  // Set width
        img.style.height = '150px'; // Set height
        img.style.objectFit = 'cover'; // Maintain aspect ratio, cover the box
      }

      const closeBtn = imageItem.querySelector('.close-btn') as HTMLElement;
      if (closeBtn) {
        closeBtn.addEventListener('click', () => {
          imageItem.remove();
        });
      }
    });
  }


  categories: any[] = [];
  brands: any[] = [];
  productForm: FormGroup;
  products: any[] = [];

  constructor(
     private categoryService: CategoryService,
     private brandService: BrandService,
     private fb: FormBuilder,
     private getAllProductService: GetAllProductService
  ) { 
    this.productForm = this.fb.group({
      name: ['', Validators.required],
      title: ['', Validators.required],
      price: ['', [Validators.required, Validators.min(0)]],
      discount_price: ['', [Validators.required, Validators.min(0)]],
      description: ['', Validators.required],
      categoryId: ['', Validators.required],
      brandId: ['', Validators.required]
    });
   }

  ngOnInit(): void {
      this.getAllCatagory();
      this.getAllBrand();
      this.getAllProduct();
  }

  getAllCatagory(){
    this.categoryService.getCategories().subscribe(response => {
      if (response.status === 'OK') {
        this.categories = response.data.categories;
      }
    });
  }

  getAllProduct(){
    this.getAllProductService.getAllProducts().subscribe((response) => {
      if (response.status === 'OK') {
      this.products = response.data.products;
      }
    });
  }

  getAllBrand(){
    this.brandService.getAllBrands().subscribe(response => {
      if (response.status === 'OK') {
        this.brands = response.data.brands;
      }
    });
  }

  onSubmit(): void {
    if (this.productForm.valid) {
      this.getAllProductService.addProduct(this.productForm.value).subscribe(response => {
        if (response.status === 'CREATED') {
          alert('Tạo sản phẩm thành công');
          this.productForm.reset();
          this.getAllCatagory();
          this.getAllBrand();
        } else {
          alert('Có lỗi xảy ra. Vui lòng thử lại.');
        }
      }, error => {
        console.error('Error creating product:', error);
        alert('Có lỗi xảy ra. Vui lòng thử lại.');
      });
    } else {
      alert('Vui lòng điền đầy đủ thông tin');
    }
  }
}
