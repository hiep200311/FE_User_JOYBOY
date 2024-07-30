import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { AuthService } from '../../../controller/authController/auth.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css'
})

export class LoginPageComponent {

 

  formLogin: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(35)]),
  });

  get f(){
    return this.formLogin.controls;
  }

  checkError: any;
   
   constructor(private authService: AuthService, private router: Router) { }

   onLogin(): void {
     this.login();
  }

  
  login(){
    const { email, password } = this.formLogin.value;

    this.authService.login(email, password).subscribe(
      response => {
        console.log(response);
        this.tokenData(response.data);
        this.handleUserRole(response.data.roles);
      },
      error => {
        console.error('Login failed', error);
        this.checkError = 'Email or password is incorrect, please re-enter..';
      }
    );
  }

  private tokenData(data: any): void {
    // Lưu token vào localStorage 
    sessionStorage.setItem('token', data.token);
    sessionStorage.setItem('refreshToken', data.refreshToken);
  }

  private handleUserRole(roles: string[]): void {
    // Điều hướng dựa trên vai trò người dùng
    if (roles.includes('[USER]')) {
      this.router.navigate(['/product']);
    }
  }
}