import { Component, OnInit } from '@angular/core';
import { OrderService } from '../order.service';  // Import OrderService
// import { Router } from '@angular/router';  

interface Product {
  productId: string;
  quantity: number;
  _id: string;
}

// Define the structure for the shipping address
interface ShippingAddress {
  street: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
}

// Define the structure for the order
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

// Define the structure of the API response
interface OrdersResponse {
  orders: Order[];
  total: number;
  page: number;
  limit: number;
}


@Component({
  selector: 'app-bookings',
  templateUrl: './bookings.component.html',
  styleUrls: ['./bookings.component.css']
})
export class BookingsComponent implements OnInit {

  orders: Order[] = []; // Array to hold orders

  constructor(private orderService: OrderService) {}

  ngOnInit(): void {
    this.fetchOrders();  // Fetch orders when the component initializes
  }

  fetchOrders(): void {
    this.orderService.getOrders().subscribe(
      (response: OrdersResponse) => {
        console.log('Fetched orders:', response);
        this.orders = response.orders;  // This now works correctly since `response` is typed
      },
      (error) => {
        console.error('Error fetching orders:', error);
      }
    );
  }

}
