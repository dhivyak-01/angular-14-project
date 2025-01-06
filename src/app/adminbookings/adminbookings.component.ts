import { Component, OnInit, AfterViewInit } from '@angular/core';
import { GetallOrdersService } from '../getall-orders.service';
declare var bootstrap: any;
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
export class AdminbookingsComponent implements OnInit, AfterViewInit {
  selectedOrder: any = null;
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
  handleView(course: any) {
    this.selectedOrder = course;  // Assign the selected course to viewedcourse
    console.log('Viewing course:', this.selectedOrder);  // Log the viewedcourse object
  }
  
  // handleView(order: any) {
  //   // Assign the clicked order to selectedOrder
  //   this.selectedOrder = order;
  // }

  ngAfterViewInit(): void {
    // Access the modal element
    const modalElement = document.getElementById('courseModal');
    
    if (modalElement) {
      // Initialize the modal with backdrop set to 'false'
      const modal = new bootstrap.Modal(modalElement, {
        backdrop: false // This disables the backdrop
      });
    }
  }
}
