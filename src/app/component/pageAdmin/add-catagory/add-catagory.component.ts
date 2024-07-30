import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../../controller/category/category.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-add-catagory',
  templateUrl: './add-catagory.component.html',
  styleUrl: './add-catagory.component.css'
})
export class AddCatagoryComponent implements OnInit{
  categories: any[] = [];
  categoryForm: FormGroup;
  constructor(
    private categoryService: CategoryService,
    private fb: FormBuilder) {
    this.categoryForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.getAllCatagory();
  }

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString('vi-VN');
  }


  getAllCatagory(){
    this.categoryService.getCategories().subscribe(response => {
      if (response.status === 'OK') {
        this.categories = response.data.categories;
      }
    });
  }

  onSubmit(): void {
    if (this.categoryForm.valid) {
      this.categoryService.addCategory(this.categoryForm.value).subscribe(response => {
        if (response.status === 'OK') {
          alert('Tạo danh mục thành công');
          this.categoryForm.reset();
          this.getAllCatagory(); // Cập nhật danh sách danh mục sau khi thêm mới
        } else {
          alert('Có lỗi xảy ra. Vui lòng thử lại.');
        }
      });
    } else {
      alert('Vui lòng điền đầy đủ thông tin');
    }
  }
}