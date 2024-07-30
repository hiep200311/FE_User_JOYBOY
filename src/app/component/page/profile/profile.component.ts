import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../controller/authController/auth.service';
import { JwtService } from '../../../controller/jwt/jwt.service';
import { UserService } from '../../../controller/userService/userService';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  currentTab: string = 'general';
  userData: any;
  oldPassword: string = '';
  newPassword: string = '';
  changePasswordMessage: string = '';
  errorMessage: string = '';
  selectedFile: File | null = null;
  tempAvatarUrl: string | ArrayBuffer | null = null; 


  constructor(
    private jwtService: JwtService, 
    private authService: AuthService,
    private userService: UserService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loadUserData();
  }

  setTab(tab: string) {
    this.currentTab = tab;
  }

  logout() {
    const token = sessionStorage.getItem('token'); // Lấy token từ session storage
    if (token) {
      this.authService.logout(token).subscribe(
        response => {
          if (response.message === 'Logout successful') {
            sessionStorage.removeItem('token'); // Xóa token khỏi session storage
            this.router.navigate(['/login']); // Điều hướng đến trang đăng nhập hoặc trang khác
          }
        },
        error => {
          console.error('Logout failed', error);
          // Xử lý lỗi phù hợp trong ứng dụng của bạn
        }
      );
    }
  }

  changePassword(): void {
    if (this.userData) {
      const userId = this.userData.id;
      this.userService.changePassword(userId, this.oldPassword, this.newPassword)
        .subscribe(response => {
          if (response.status === 'OK') { 
            this.changePasswordMessage = 'Password changed successfully';
            this.errorMessage = ''; // Xóa thông báo lỗi
            sessionStorage.removeItem('token'); 
            this.router.navigate(['/login']); 
          } else {
            this.changePasswordMessage = ''; 
            this.errorMessage = response.message || 'Error changing password';
          }
        }, error => {
          this.changePasswordMessage = ''; // Xóa thông báo thành công
          if (error.status === 400) { // BAD REQUEST
            this.errorMessage = error.error.message || 'Invalid old password';
          } else if (error.status === 404) { // NOT FOUND
            this.errorMessage = error.error.message || 'User not found';
          } else {
            this.errorMessage = 'Error changing password';
          }
          console.error('Error changing password', error);
        });
    }
  }
  

  private loadUserData() {
    const token = sessionStorage.getItem('token');
    if (token) {
      this.userData = this.jwtService.decodeToken(token); 
      this.userService.getProfile(this.userData.userId)
        .subscribe(response => {
          if (response.status === 'OK') {
            this.userData = response.data;
          } else {
            this.errorMessage = 'Error loading user data';
          }
        }, error => {
          this.errorMessage = 'Error loading user data';
          console.error('Error loading user data', error);
        });
    }
  }

  updateUser(): void {
    if (this.userData) {
      const userId = this.userData.id;
      this.userService.updateUser(userId, this.userData)
        .subscribe(response => {
          if (response.status === 'OK') {
            alert('User updated successfully');
          } else {
            alert('Error updating user');
          }
        }, error => {
          console.error('Error updating user', error);
          alert('Error updating user');
        });
    }
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
    if (this.selectedFile) {
      const reader = new FileReader();
      reader.onload = () => {
        this.tempAvatarUrl = reader.result; // Cập nhật URL tạm thời
      };
      reader.readAsDataURL(this.selectedFile);
    }
  }


  uploadAvatar(): void {
    if (this.selectedFile && this.userData) {
      const userId = this.userData.id;
      if (!userId) {
        this.errorMessage = 'User ID is not defined';
        console.error('User ID is not defined');
        return;
      }
      this.userService.uploadAvatar(userId, this.selectedFile).subscribe(
        response => {
          console.log('Upload response:', response); // Debug log
          if (response.status === 'CREATED') {
            if (response.data && response.data.avatarUrl) {
              // Cập nhật URL của avatar ngay sau khi tải lên thành công
              this.userData.avatarUrl = response.data.avatarUrl; // Cập nhật URL của avatar
              this.tempAvatarUrl = null; // Xóa URL tạm thời sau khi tải lên thành công
              alert('Upload image avatar successfully');
  
              // Cập nhật URL hình ảnh với cache busting để làm mới hình ảnh
              this.userData.avatarUrl += `?timestamp=${new Date().getTime()}`;
            } else {
              alert('Invalid response data');
            }
          } else {
            alert('Error uploading image');
          }
        },
        error => {
          console.error('Upload error:', error);
          alert('Error uploading image');
        }
      );
    } else {
      alert('Please select a file first');
    }
  }
  
  onReset(): void {
    this.selectedFile = null;
    this.tempAvatarUrl = null; // Xóa URL tạm thời khi reset
  }
}