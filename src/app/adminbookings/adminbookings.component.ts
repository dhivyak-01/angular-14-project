import { Component, OnInit, AfterViewInit } from '@angular/core';
import { GetallOrdersService } from '../getall-orders.service';
declare var bootstrap: any;


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

  // Delete an order by ID
  handleDelete(id: string) {
    if (confirm('Are you sure you want to delete this order?')) {
      this.ordersService.deleteOrder(id).subscribe(
        () => {
          // On success, remove the deleted order from the local list
          this.orders = this.orders.filter(order => order._id !== id);
          console.log('Order deleted successfully');
        },
        error => {
          console.error('Error deleting order:', error);
        }
      );
    }
  }

}
