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
  pagedOrders: any[] = [];       // Array to store paginated orders
  totalPages: number = 0;        // Total number of pages
  currentPage: number = 1;       // Current page number
  pageSize: number = 5;          // Number of items per page


  constructor(private ordersService: GetallOrdersService) {}

  // ngOnInit(): void {
  //   this.ordersService.getOrders().subscribe(
  //     data => {
  //       this.orders = data;
  //       console.log("all data",data);
        
  //     },
  //     error => {
  //       console.error('Error fetching orders:', error);
  //     }
  //   );
  // }


  ngOnInit(): void {
    this.loadOrders(); // Load orders when the component initializes
  }

  // Load all orders and calculate pagination
  loadOrders(): void {
    this.ordersService.getOrders().subscribe(
      data => {
        this.orders = data;
        this.totalPages = Math.ceil(this.orders.length / this.pageSize); // Calculate total pages
        this.updatePagedOrders(); // Display orders for the first page
        console.log("All orders:", data);
      },
      error => {
        console.error('Error fetching orders:', error);
      }
    );
  }

  // Update the paginated orders based on the current page
  updatePagedOrders(): void {
    const startIndex = (this.currentPage - 1) * this.pageSize; // Calculate start index
    const endIndex = startIndex + this.pageSize;               // Calculate end index
    this.pagedOrders = this.orders.slice(startIndex, endIndex); // Slice orders array for current page
  }

  // Handle page changes
  loadPage(page: number): void {
    this.currentPage = page; // Update current page
    this.updatePagedOrders(); // Update displayed orders
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
