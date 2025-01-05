import { Component, OnInit, AfterViewInit } from '@angular/core';
import { CartService } from '../cart.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
declare var bootstrap: any;

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit, AfterViewInit {


  cartItems: any[] = [];
  isModalOpen: boolean = false; 

  order: any = {
    name: '', 
    phoneNumber: '',
    shippingAddress: {
      street: '',
      city: '',
      state: '',
      postalCode: '',
      country: ''
    },
    paymentMethod: '',
    products: [],
    totalAmount: 0
  };

  constructor(private cartService: CartService, private http: HttpClient,
    private router: Router,
    private authService: AuthService ) {}

  ngOnInit(): void {
    this.cartItems = this.cartService.getCart();  // Get the cart items from the service
    this.calculateTotalAmount();
    this.populateProducts();

    // Get user info from AuthService (localStorage)
    this.order.name = this.authService.getName();
    this.order.phoneNumber = this.authService.getPhoneNumber();
  }
  ngAfterViewInit(): void {
    // Access the modal element
    const modalElement = document.getElementById('orderModal');
    
    if (modalElement) {
      // Initialize the modal with backdrop set to 'false'
      const modal = new bootstrap.Modal(modalElement, {
        backdrop: false // This disables the backdrop
      });
    }
  }

   populateProducts(): void {
    this.order.products = this.cartItems.map(item => ({
      productId: item.id,
      quantity: item.quantity || 1
    }));
  }

  calculateTotalAmount(): void {
    this.order.totalAmount = this.cartItems.reduce(
      (total, item) => total + (item.price * (item.quantity || 1)),
      0
    );
  }

  submitOrder(orderForm: any): void {
    if (orderForm.valid) {
      const userId = this.authService.getUserId(); // Get userId from AuthService (localStorage)

      // Construct the order payload with the additional user info
      const orderPayload = {
        userId,
        name: this.order.name,
        phoneNumber: this.order.phoneNumber,
        products: this.order.products,
        shippingAddress: this.order.shippingAddress,
        paymentMethod: this.order.paymentMethod,
        totalAmount: this.order.totalAmount
      };
      console.log('Order placed successfully', orderPayload);
      // Send the request to the API
      this.http.post('http://localhost:3000/api/orders', orderPayload).subscribe(
        (response) => {
          
          console.log('Order placed successfully', response);
          this.router.navigate(['/order-success']);  // Redirect to a success page
        },
        (error) => {
          console.error('Error placing order', error);
        }
      );
    }
  }

}
