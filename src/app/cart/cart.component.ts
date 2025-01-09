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
  private modal: any;
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
        backdrop: false  // This disables the backdrop
      });
  
      // Store the modal instance in a variable for future use
      this.modal = modal;
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


  onBookNowClick(): void {
    if (this.authService.isLoggedIn()) {
      // Show the modal programmatically
      if (this.modal) {
        this.modal.show();  // Show the modal
      }
    } else {
      alert('You need to log in to place an order.');
      this.router.navigate(['/login']);
    }
  }

  submitOrder(orderForm: any): void {
    if (orderForm.valid) {
      const userId = this.authService.getUserId();
      const name = this.authService.getName();
      const phoneNumber = this.authService.getPhoneNumber();
     
      const orderPayload = {
        userId,
        name,
        phoneNumber,
        image: this.order.image,
        products: this.order.products,
        shippingAddress: this.order.shippingAddress,
        paymentMethod: this.order.paymentMethod,
        totalAmount: this.order.totalAmount
      };

      this.orderService.placeOrder(orderPayload).subscribe(
        (response) => {
          alert('Order placed successfully');
          orderForm.reset();
          this.order = {
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
          // Close the modal (use bootstrap modal to close)
          const modalElement = document.getElementById('orderModal');
          if (modalElement) {
            const modal = bootstrap.Modal.getInstance(modalElement);
            modal.hide();  // Close the modal
          }
        },
        (error) => {
          console.error('Error placing order', error);
        }
      );
    }
  }
  
}




