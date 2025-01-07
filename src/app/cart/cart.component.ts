import { Component, OnInit, AfterViewInit } from '@angular/core';
import { CartService } from '../cart.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { OrderService } from '../order.service'; // Added OrderService for order placement
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
    image: '',
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

  constructor(
    private cartService: CartService,
    private http: HttpClient,
    private router: Router,
    private authService: AuthService,
    private orderService: OrderService  // Injecting OrderService for placing orders
  ) {}

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
    this.order.products = this.cartItems.map(item => {
      // Log the values for each product
      console.log('productId:', item.courseId);
      console.log('image:', item.image);
      console.log('quantity:', item.quantity || 1);  // Default to 1 if quantity is undefined
  
      return {
        productId: item.courseId,
        image: item.image,
        quantity: item.quantity || 1
      };
    });
  }

  // Calculating the total amount of the cart
  calculateTotalAmount(): void {
    this.order.totalAmount = this.cartItems.reduce(
      (total, item) => {
        // Check if price and quantity are valid numbers
        const price = item.price || 0;  // Default to 0 if price is undefined
        const quantity = item.quantity || 1;  // Default to 1 if quantity is undefined

        return total + (price * quantity);  // Add price * quantity to total
      },
      0  // Initial total amount is 0
    );
  }

   // Submit the order to the server
   submitOrder(orderForm: any): void {
    if (orderForm.valid) {
      const userId = this.authService.getUserId(); // Get userId from AuthService (localStorage)

      // Construct the order payload with the additional user info
      const orderPayload = {
        userId,
        name: this.order.name,
        phoneNumber: this.order.phoneNumber,
        image: this.order.image,
        products: this.order.products,
        shippingAddress: this.order.shippingAddress,
        paymentMethod: this.order.paymentMethod,
        totalAmount: this.order.totalAmount
      };
      console.log('Order orderPayload cart page', orderPayload);

      // Use OrderService to place the order
      this.orderService.placeOrder(orderPayload).subscribe(
        (response) => {
          // Success response
          alert('Order placed successfully');
          console.log('Order placed successfully', response);
          // this.router.navigate(['/order-success']);  // Redirect to a success page
        },
        (error) => {
          // Error response
          console.error('Error placing order', error);
        }
      );
    }
  }
  
}




