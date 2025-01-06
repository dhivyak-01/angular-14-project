import { Component, OnInit } from '@angular/core';
import { GetallOrdersService } from '../getall-orders.service';

// export interface Order {
//   _id: string;
//   name: string;
//   phoneNumber: string;
//   orderDate: string;
//   totalAmount: number;
//   status: string;
//   shippingAddress: {
//     street: string;
//     city: string;
//     state: string;
//     postalCode: string;
//     country: string;
//   };
//   products: Array<{
//     productId: string;
//     quantity: number;
//   }>;
// }

// export interface OrdersResponse {
//   orders: Order[];  // The response contains an array of orders
//   total: number;
//   page: number;
//   limit: number;
// }

@Component({
  selector: 'app-adminbookings',
  templateUrl: './adminbookings.component.html',
  styleUrls: ['./adminbookings.component.css']
})
export class AdminbookingsComponent implements OnInit {

  orders: any[] = [];

  constructor(private ordersService: GetallOrdersService) {}

  ngOnInit(): void {
    this.ordersService.getOrders().subscribe(
      data => {
        this.orders = data;
        console.log("all data",data);
        
      },
      error => {
        console.error('Error fetching orders:', error);
      }
    );
  }

}
