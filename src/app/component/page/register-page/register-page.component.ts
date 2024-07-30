import { Component } from '@angular/core';
import { AccountService } from '../../../controller/accountController/account.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { LanguageService } from '../../../controller/configService/config-service.service';

interface RegisterDTO {
  username: string;
  email: string;
  password: string;
}

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrl: './register-page.component.css'
})


export class RegisterPageComponent {

  user: RegisterDTO = { username: '', email: '', password: '' };
  usernameError: string = '';
  emailError: string = '';
  passwordError: string = '';
  registerError: string = '';
  isSubmitting: boolean = false;
  config: any;

  constructor(private accountService: AccountService, private router: Router, private languageService: LanguageService) {}

  ngOnInit(): void {
    this.languageService.getConfig().subscribe((data: any) => {
      this.config = data;
    });
  }
  onSubmit(registerForm: NgForm): void {
    this.clearErrors();
    if (registerForm.invalid) {
      this.validateForm();
      return;
    }

    this.isSubmitting = true;

    this.accountService.registerUser(this.user).subscribe(
      response => {
        this.isSubmitting = false;
        this.router.navigate(['/login']);
      },
      error => {
        this.isSubmitting = false;
        this.registerError = error.message || 'Đã xảy ra lỗi';
      }
    );
  }



  private validateForm(): void {
    this.usernameError = this.validateUserName(this.user.username);
    this.emailError = this.validateEmail(this.user.email);
    this.passwordError = this.validatePassword(this.user.password);
  }

  private clearErrors(): void {
    this.usernameError = '';
    this.emailError = '';
    this.passwordError = '';
    this.registerError = '';
  }

  private validateEmail(email: string): string {
    if (!email) {
      return this.config.messages.emailRequired;
    }
    if (!this.isEmailValid(email)) {
      return this.config.messages.emailInvalid;
    }
    return '';
  }

  private validatePassword(password: string): string {
    if (!password) {
      return this.config.messages.passwordRequired;
    }
    if (password.length < this.config.register.passwordMinLength) {
      return this.config.messages.passwordMinLength;
    }
    if (password.length > this.config.register.passwordMaxLength) {
      return this.config.messages.passwordMaxLength;
    }
    return '';
  }

  private validateUserName(username: string): string {
    if (!username) {
      return this.config.messages.usernameRequired;
    }
    if (username.length < this.config.register.usernameMinLength) {
      return this.config.messages.usernameMinLength;
    }
    if (username.length > this.config.register.usernameMaxLength) {
      return this.config.messages.usernameMaxLength;
    }
    return '';
  }

  private isEmailValid(email: string): boolean {
    const re = /^(([^<>()\[\]\.,;:\s@"]+(\.[^<>()\[\]\.,;:\s@"]+)*)|(".+"))@(([^<>()[\]\.,;:\s@"]+\.)+[^<>()[\]\.,;:\s@"]{2,})$/i;
    return re.test(String(email).toLowerCase());
  }

}