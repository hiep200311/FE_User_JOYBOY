import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

interface RegisterDTO {
  username: string;
  email: string;
  password: string;
}

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  private apiUrl = 'http://localhost:8888/api/v1/account/register';

  constructor(private http: HttpClient) {}

  registerUser(user: RegisterDTO): Observable<any> { // Sửa lại thành RegisterDTO
    return this.http.post<any>(this.apiUrl, user, { // Sửa lại thành user
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    }).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: any): Observable<never> {
    console.error('An error occurred', error);
    throw new Error(error.message || error);
  }
}