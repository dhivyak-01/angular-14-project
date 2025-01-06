import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'http://localhost:3000/api/login';  

  constructor(private http: HttpClient) { }

  
  login(username: string, password: string): Observable<any> {
    return this.http.post(this.apiUrl, { username, password });
  }

   // Store the token and user ID in localStorage after successful login
   saveTokenAndUserId(response: any): void {
    localStorage.setItem('authToken', response.token); // Save token in localStorage
    localStorage.setItem('userId', response.userId);  // Save user ID in localStorage
    localStorage.setItem('name', response.name);  // Save user's name
    localStorage.setItem('phoneNumber', response.phoneNumber); 
    localStorage.setItem('image', response.image); 
    console.log('authToken', response.token); // Save token in localStorage
    console.log('userId', response.userId);  // Save user ID in localStorage
    console.log('name', response.name);  // Save user's name
    console.log('phoneNumber', response.phoneNumber);  // Save user's phone number
    console.log('image', response.image); 
  }

  // Get the JWT token from localStorage
  getToken(): string {
    return localStorage.getItem('authToken') || '';
  }

  // Get the user ID from localStorage
  getUserId(): string {
    return localStorage.getItem('userId') || '';
  }

  // Get the user's name from localStorage
  getName(): string {
    return localStorage.getItem('name') || '';
  }

  // Get the user's phone number from localStorage
  getPhoneNumber(): string {
    return localStorage.getItem('phoneNumber') || '';
  }
   // Get the user's phone number from localStorage
   getImage(): string {
    return localStorage.getItem('image') || '';
  }
  
  // Get the user ID from the decoded JWT token
  getUserIdFromToken(): string {
    const token = this.getToken();  // Get the JWT token from localStorage
    
    if (token) {
      try {
        const decodedToken: any = jwtDecode(token);  // Decode the JWT token
        
        // Get current time in seconds (as per the JWT exp field)
        const currentTime = Math.floor(Date.now() / 1000);
        
        // Check if the token has expired, and handle the case where the 'exp' field is missing
        if (decodedToken.exp && decodedToken.exp < currentTime) {
          console.error('Token has expired');
          this.logout();  // Log out the user if the token has expired
          return '';  // Return empty string if token is expired
        }
  
        // If 'exp' is not available, we assume the token is valid (this is an assumption based on your token management system)
        if (!decodedToken.exp) {
          console.warn('Token does not have an expiration field. Assuming token is valid.');
        }
  
        // Return the userId from the decoded token
        return decodedToken.userId || '';  // Return the userId from the token or an empty string if not found
      } catch (error) {
        console.error('Error decoding the token:', error);
        this.logout();  // Optionally log out the user if token decoding fails
        return '';  // Return empty string if there was an error decoding the token
      }
    }
    
    return '';  // Return empty string if no token is present
  }

  // Check if the user is logged in
  isLoggedIn(): boolean {
    const token = this.getToken();
    if (token) {
      try {
        const decodedToken: any = jwtDecode(token);
        const currentTime = Math.floor(Date.now() / 1000);
        
        // Check if the token has expired
        if (decodedToken.exp && decodedToken.exp < currentTime) {
          console.error('Token has expired');
          this.logout();  // Optionally log out the user
          return false;
        }
        return true;
      } catch (error) {
        console.error('Error decoding token:', error);
        return false;
      }
    }
    return false;
  }

  // Log out the user (clear stored data)
  logout(): void {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userId');
    localStorage.removeItem('name');
    localStorage.removeItem('phoneNumber');
    // Optionally, redirect the user to the login page after logout
    window.location.href = '/login';
  }

  

}