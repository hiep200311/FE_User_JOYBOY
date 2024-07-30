import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private baseUrl = 'http://localhost:8888/api/v1/users';

  constructor(private http: HttpClient) { }

  changePassword(userId: string, oldPassword: string, newPassword: string): Observable<any> {
    const token = sessionStorage.getItem('token'); // Lấy token từ session storage
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    const body = {
      oldPassword: oldPassword,
      newPassword: newPassword
    };
    return this.http.post(`${this.baseUrl}/change-password/${userId}`, body, { headers });
  }

  getProfile(userId: string): Observable<any> {
    const token = sessionStorage.getItem('token'); // Lấy token từ session storage
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get(`${this.baseUrl}/profile/${userId}`, { headers });
  }

  updateUser(userId: string, userData: any): Observable<any> {
    const token = sessionStorage.getItem('token'); // Lấy token từ session storage
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    const body = {
      username: userData.username,
      firstName: userData.firstName,
      lastName: userData.lastName,
      phoneNumber: userData.phoneNumber,
      email: userData.email
    };
    return this.http.patch(`${this.baseUrl}/update/${userId}`, body, { headers });
  }

  uploadAvatar(userId: string, file: File): Observable<any> {
    const token = sessionStorage.getItem('token'); // Lấy token từ session storage
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    const formData = new FormData();
    formData.append('file', file);
  
    return this.http.post(`${this.baseUrl}/uploads/${userId}`, formData, { headers });
  }
}