import { Injectable } from '@angular/core';
import { HttpClient ,HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private apiUrl = 'http://localhost:8888/api/v1/categories/getAll';
  private addCategoryUrl = 'http://localhost:8888/api/v1/admin/categories/add-category';

  constructor(private http: HttpClient) { }

  getCategories(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }

  addCategory(category: any): Observable<any> {
    const adminId = sessionStorage.getItem('adminId'); // Lấy admin ID từ session storage
    const token = sessionStorage.getItem('token'); // Lấy token từ session storage
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    const body = {
      ...category,
      adminId: adminId 
    };
    return this.http.post<any>(this.addCategoryUrl, body, { headers });
  }
}