import { Component, OnInit } from '@angular/core';
import { RegisterService } from '../register.service';

@Component({
  selector: 'app-adduser',
  templateUrl: './adduser.component.html',
  styleUrls: ['./adduser.component.css']
})
export class AdduserComponent implements OnInit {

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

  constructor(private registerService: RegisterService) {}

  
  onSubmit() {
    
    if (this.user.password !== this.user.confirmPassword) {
      alert('Passwords do not match!');
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
      },
      error => {
        console.error('Error during registration:', error);
        alert('Registration failed. Please try again.');
      }
    );
  }

  ngOnInit(): void {
  }

}
