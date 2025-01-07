import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { AdminService } from '../admin.service';
@Component({
  selector: 'app-adminlogin',
  templateUrl: './adminlogin.component.html',
  styleUrls: ['./adminlogin.component.css']
})
export class AdminloginComponent implements OnInit, AfterViewInit  {

  
  user = { username: '', password: '' };
  errorMessage: string = '';  // Property for error message
  @ViewChild('usernameInput') usernameInput: any;
  @ViewChild('passwordInput') passwordInput: any;
  constructor(
    private adminService: AdminService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Initialization logic here if needed
  }
  ngAfterViewInit() {
    // Automatically focus on the username field when the component is loaded
    if (this.usernameInput) {
      this.usernameInput.nativeElement.focus();
    }
  }
  // This method focuses the next input field
  focusNext(inputName: string) {
    if (inputName === 'usernameInput' && this.usernameInput) {
      this.usernameInput.nativeElement.focus();
    } else if (inputName === 'passwordInput' && this.passwordInput) {
      this.passwordInput.nativeElement.focus();
    }
  }
  // Submit method to handle form submission
  onSubmit() {
    // Calling the loginAdmin method from AdminService
    this.adminService.loginAdmin(this.user.username, this.user.password).subscribe(
      (response) => {
        console.log('Login success:', response);

        // Assuming the response contains a token and admin ID
        const { token, adminId } = response; // Adjust this depending on your actual response format

        // Save token and adminId using localStorage/sessionStorage
        localStorage.setItem('adminToken', token);   // Store token in localStorage
        localStorage.setItem('adminId', adminId);    // Store adminId in localStorage

        // Save token and adminId in AdminService (optional, for central management)
        this.adminService.saveTokenAndAdminId({ token, adminId });

        // Redirect to the admin panel
        this.router.navigate(['/adminpanel']);
        this.errorMessage = ''; // Clear any previous error message
      },
      (error) => {
        console.error('Login error:', error);
        // Handle error (e.g., show error message)
        this.errorMessage = 'Invalid username or password.';  // Set error message
      }
    );
  }
  
}
