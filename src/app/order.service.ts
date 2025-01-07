import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service'; 



interface Product {
  productId: string;
  image: string;
  quantity: number;
  _id: string;
}

// Define the ShippingAddress interface
interface ShippingAddress {
  street: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
}

// Define the Order interface
interface Order {
  _id: string;
  userId: string;
  name: string;
  phoneNumber: string;
  products: Product[];
  shippingAddress: ShippingAddress;
  paymentMethod: string;
  totalAmount: number;
  status: string;
  orderDate: string;
}

// Define the OrdersResponse interface
interface OrdersResponse {
  orders: Order[];
  total: number;
  page: number;
  limit: number;
}

interface CartItem {
  _id: string;          
  price: number;       
  quantity: number;    
  title: string;      
  image?: string;      
  description?: string; 
  duration?: string;   
  lectures?: number;
}
@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private apiUrlGetAllOrders = 'http://localhost:3000/api/orders/getallorders';
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
    // Fix the error by defining 'total' and 'item' types explicitly
    const totalAmount = cartItems.reduce((total: number, item: CartItem) => {
      return total + (item.price * item.quantity);
    }, 0);
    console.log('Total Amount:', totalAmount);  // Log the total amount to the console
    return totalAmount;
  }
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
    console.log('Order Payload from orderservice:', orderPayload);  // Log the order payload to the console
    
    // Send the POST request to place the order
    return this.http.post(this.apiUrl, orderPayload, { headers });
  }

    
    getOrders(): Observable<OrdersResponse> {
      const userId = this.authService.getUserId();  // Get the user ID from the AuthService
      if (!userId) {
        throw new Error('User is not logged in!');
      }
  
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${this.authService.getToken()}`,
        'Content-Type': 'application/json',
      });
  
      return this.http.get<OrdersResponse>(`${this.apiUrl}?userId=${userId}`, { headers });
    }



  
}








