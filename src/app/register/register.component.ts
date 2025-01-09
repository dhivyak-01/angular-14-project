import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RegisterService } from '../register.service';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  user = {
    username: '',
    password: '',
    confirmPassword: '',  
    email: '',
    firstName: '',
    lastName: '',
    phoneNumber: '',
    dateOfBirth: ''
  };
  errorMessages: string[] = []; 
  constructor(private registerService: RegisterService, private router: Router) {}

  
  onSubmit() {
    this.errorMessages = [];  // Reset errors before new submission
    
    if (this.user.password !== this.user.confirmPassword) {
      this.errorMessages.push('Passwords do not match!');
      return;
    }

    const registrationData = {
      username: this.user.username,
      password: this.user.password,  
      email: this.user.email,
      firstName: this.user.firstName,
      lastName: this.user.lastName,
      phoneNumber: this.user.phoneNumber,
      dateOfBirth: this.user.dateOfBirth
    };

    this.registerService.registerUser(registrationData).subscribe(
      response => {
        alert('Registration successful');
        console.log('Registration successful:', response);
        this.router.navigate(['/login']);
      },
      error => {
        console.error('Error during registration:', error);
        
        if (error.error && error.error.error) {
          this.errorMessages.push(error.error.error);  // Capture backend error message
        } else {
          this.errorMessages.push('Registration failed. Please try again.');
        }
      }
    );
  }

  ngOnInit(): void {
  }

}
