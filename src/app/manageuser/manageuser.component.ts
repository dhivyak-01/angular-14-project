import { Component, OnInit, AfterViewInit } from '@angular/core';
import { RegisterService } from '../register.service';
import { Router } from '@angular/router'; 
declare var bootstrap: any;

@Component({
  selector: 'app-manageuser',
  templateUrl: './manageuser.component.html',
  styleUrls: ['./manageuser.component.css']
})
export class ManageuserComponent implements OnInit, AfterViewInit {

  users: any[] = [];  // Array to hold the users data
  pagedUsers: any[] = [];          // Array to hold users for the current page
  totalUsers: number = 0;          // Total number of users
  currentPage: number = 1;         // Current page number
  pageSize: number = 5;                // Number of items per page 
  selectedIds: string[] = [];
  selectedUser: any = null;
  vieweduser: any = null;

  constructor(private registerService: RegisterService,private router: Router) { }

  ngOnInit(): void {
    this.loadUsers();  // Load users when the component is initialized
  }

  // Fetch all users from the API
  loadUsers(): void {
    this.registerService.getAllUsers().subscribe(
      (response) => {
        this.users = response;                // Store all users
        this.totalUsers = this.users.length;  // Set total number of users
        this.updatePagedUsers();              // Display the first page of users
      },
      (error) => {
        console.error('Error fetching users:', error);  // Handle any errors
      }
    );
  }

  // Update users for the current page
  updatePagedUsers(): void {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.pagedUsers = this.users.slice(startIndex, endIndex); // Slice users array for the current page
  }

  // Handle page changes
  loadPage(page: number): void {
    this.currentPage = page;  // Update current page
    this.updatePagedUsers();  // Update the displayed users for the new page
  }


  handleSelect(userId: string) {
    if (this.selectedIds.includes(userId)) {
      // If course is already selected, deselect it
      this.selectedIds = this.selectedIds.filter(id => id !== userId);
    } else {
      // If course is not selected, select it
      this.selectedIds.push(userId);
    }
    console.log('Selected course ID:', userId);
  }

  // Handle selecting or deselecting all useres
handleSelectAll(event: any) {
  const isChecked = event.target.checked;
  if (isChecked) {
    // If 'Select All' is checked, select all useres
    this.selectedIds = this.users.map((user: { id: string }) => user.id);
  } else {
    // If 'Select All' is unchecked, deselect all useres
    this.selectedIds = [];
  }
  console.log('Select all:', isChecked);
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

  // Handle viewing course details
handleView(user: any) {
  this.vieweduser = user;  // Assign the selected course to viewedcourse
  console.log('Viewing banner:', this.vieweduser);  // Log the viewedcourse object
}

deleteUser(userId: string): void {
  if (confirm('Are you sure you want to delete this user?')) {
    this.registerService.deleteUserById(userId).subscribe(
      (response) => {
        alert(response.message);  // Show success message
        this.loadUsers();  // Reload the users list
      },
      (error) => {
        console.error('Error deleting user', error);
      }
    );
  }
}

editUser(user: any) {
  user.isEditing = true;
  // Store the original values to allow cancellation
  user.originalData = { ...user };
}

saveUser(user: any) {
  this.registerService.updateUser(user).subscribe(
    (response) => {
      console.log('User updated successfully', response);
      user.isEditing = false; // Stop editing mode after successful update
    },
    (error) => {
      console.error('Error updating user', error);
    }
  );
}

cancelEdit(user: any) {
  // Revert to original data
  user.username = user.originalData.username;
  user.email = user.originalData.email;
  user.phoneNumber = user.originalData.phoneNumber;
  user.dateOfBirth = user.originalData.dateOfBirth;
  user.isEditing = false; // Stop editing mode
}

}
