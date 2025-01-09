import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';  // Import the AuthService
import { Router } from '@angular/router'; 


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


  user = {
    email: '',
    password: ''
  };
  errorMessage: string | null = null;  // Store any error messages during login

  constructor(private authService: AuthService, private router: Router) {}

  // onSubmit(): void {
  //   // Check if username and password are provided
  //   if (this.user.username && this.user.password) {
  //     this.authService.login(this.user.username, this.user.password).subscribe(
  //       (response) => {
  //         console.log('Login successful', response);
          
  //         // Store token and userId dynamically after successful login
  //         this.authService.saveTokenAndUserId(response);
          
  //         // Redirect to the courses page (or any desired page)
  //         this.router.navigate(['/cart']);  
  //       },
  //       (error) => {
  //         console.error('Login failed', error);
  //         this.errorMessage = 'Invalid username or password. Please try again.';  // Show error message if login fails
  //       }
  //     );
  //   } else {
  //     this.errorMessage = 'Username and password are required!';  // Handle missing credentials
  //   }
  // }


  
  onSubmit(): void {
    if (!this.user.email || !this.user.password) {
      this.errorMessage = 'Email and password are required!';
      return;
    }

    const emailPattern = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
    if (!emailPattern.test(this.user.email)) {
      this.errorMessage = 'Please enter a valid email address.';
      return;
    }

    this.authService.login(this.user.email, this.user.password).subscribe(
      (response) => {
        console.log('Login successful', response);
        this.authService.saveTokenAndUserId(response);
        this.router.navigate(['/cart']);
      },
      (error) => {
        console.error('Login failed', error);
        if (error.error && error.error.error === 'Invalid email or password.') {
          this.errorMessage = 'Invalid email or password. Please try again.';
        } else if (error.error && error.error.error === 'User not found. Please register.') {
          // Display alert and redirect to register page
          alert('User not found. Please register.');
          this.router.navigate(['/register']);
        } else {
          this.errorMessage = 'An unexpected error occurred. Please try again later.';
        }
      }
    );
  }
  ngOnInit(): void {
  }

}
