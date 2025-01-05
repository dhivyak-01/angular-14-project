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
    username: '',
    password: ''
  };
  errorMessage: string | null = null;  // Store any error messages during login

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit(): void {
    // Check if username and password are provided
    if (this.user.username && this.user.password) {
      this.authService.login(this.user.username, this.user.password).subscribe(
        (response) => {
          console.log('Login successful', response);
          
          // Store token and userId dynamically after successful login
          this.authService.saveTokenAndUserId(response);
          
          // Redirect to the courses page (or any desired page)
          this.router.navigate(['/course']);  
        },
        (error) => {
          console.error('Login failed', error);
          this.errorMessage = 'Invalid username or password. Please try again.';  // Show error message if login fails
        }
      );
    } else {
      this.errorMessage = 'Username and password are required!';  // Handle missing credentials
    }
  }

  ngOnInit(): void {
  }

}
