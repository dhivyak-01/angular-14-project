import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service'; 


@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private apiUrl = 'http://localhost:3000/api/orders'; // API endpoint to place an order

  constructor(private http: HttpClient, private authService: AuthService) {}

  // Method to get cart items (example)
  getCartItems() {
    const cartItems = JSON.parse(localStorage.getItem('cartItems') || '[]');
    console.log('Cart Items:', cartItems);  // Log the cart items to the console
    return cartItems;
  }

  // Method to calculate total amount (example)
  getTotalAmount() {
    const cartItems = this.getCartItems();
    const totalAmount = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
    console.log('Total Amount:', totalAmount);  // Log the total amount to the console
    return totalAmount;
  }

  // Method to place an order
  placeOrder(orderPayload: any): Observable<any> {
    // Get the token from AuthService to add it in the headers
    const token = this.authService.getToken();
    console.log('Token:', token);  // Log the token to the console
    
    // If the token is missing or invalid, we can log a warning here
    if (!token) {
      console.warn('No token found! Order placement might fail due to unauthorized access.');
      console.error('Token is missing!');
    }
    
    // Create the headers with the token
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
    console.log('Authorization Header:', headers);
    console.log('Order Payload:', orderPayload);  // Log the order payload to the console
    
    // Send the POST request to place the order
    return this.http.post(this.apiUrl, orderPayload, { headers });
  }
}
