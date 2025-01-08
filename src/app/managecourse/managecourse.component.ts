
import { Component, OnInit, AfterViewInit } from '@angular/core';
import { CourseService } from '../course.service'; 
declare var bootstrap: any;
@Component({
  selector: 'app-managecourse',
  templateUrl: './managecourse.component.html',
  styleUrls: ['./managecourse.component.css']
})
export class ManagecourseComponent implements OnInit, AfterViewInit {
  courses: any = { products: [] };
  selectedIds: string[] = []; // Holds selected course IDs
  totalCourses: number = 0; 
  pagedCourses: any[] = [];                   // Total number of courses fetched
  pageSize: number = 5;                   // Define how many courses to display per page
  currentPage: number = 1;                // Define the current page number
  totalPages: number = 0;  
  viewedcourse: any = null;

  constructor(private courseService: CourseService) {}


ngOnInit(): void {
  this.fetchProducts();
}

// Fetch all products when the component is initialized
fetchProducts(): void {
  this.courseService.getProducts()
    .subscribe(
      (response) => {
        this.courses.products = response.products;  // Store the fetched products (courses)
        this.totalCourses = response.total;          // Store the total number of courses
        this.totalPages = Math.ceil(this.totalCourses / this.pageSize);  // Calculate total pages
        this.updatePagedCourses();  // Paginate the courses for the current page
      },
      (error) => {
        console.error('Error fetching courses:', error);
      }
    );
}

updatePagedCourses(): void {
  const startIndex = (this.currentPage - 1) * this.pageSize;  // Calculate the start index
  const endIndex = startIndex + this.pageSize;                // Calculate the end index
  this.pagedCourses = this.courses.products.slice(startIndex, endIndex);  // Slice the courses array to get the current page's courses
}

// Handle page changes
loadPage(page: number): void {
  this.currentPage = page;  // Update the current page number
  this.updatePagedCourses(); // Update the displayed courses for the new page
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
// Handle delete selected courses
handleDeleteSelected() {
  // Logic to delete selected courses
  console.log('Deleting selected courses:', this.selectedIds);
  // Filter out the selected courses from the courses list
  this.courses = this.courses.filter((course: { id: string }) => !this.selectedIds.includes(course.id));
  this.selectedIds = []; // Clear the selectedIds array after deletion
}

// Handle selecting or deselecting all courses
handleSelectAll(event: any) {
  const isChecked = event.target.checked;
  if (isChecked) {
    // If 'Select All' is checked, select all courses
    this.selectedIds = this.courses.map((course: { id: string }) => course.id);
  } else {
    // If 'Select All' is unchecked, deselect all courses
    this.selectedIds = [];
  }
  console.log('Select all:', isChecked);
}

// Handle selecting a specific course
handleSelect(courseId: string) {
  if (this.selectedIds.includes(courseId)) {
    // If course is already selected, deselect it
    this.selectedIds = this.selectedIds.filter(id => id !== courseId);
  } else {
    // If course is not selected, select it
    this.selectedIds.push(courseId);
  }
  console.log('Selected course ID:', courseId);
}

// Handle viewing course details
handleView(course: any) {
  this.viewedcourse = course;  // Assign the selected course to viewedcourse
  console.log('Viewing course:', this.viewedcourse);  // Log the viewedcourse object
}

closeModal() {
  const modal = document.getElementById('courseModal');
  if (modal) {
    const modalInstance = bootstrap.Modal.getInstance(modal);
    modalInstance.hide();
    
    // Remove the backdrop manually if it persists
    const backdrop = document.querySelector('.modal-backdrop');
    if (backdrop) {
      backdrop.remove();
    }
  }
}

handleDelete(courseId: string): void {
  this.courseService.deleteCourse(courseId).subscribe(
    response => {
      console.log('Course deleted successfully:', response);
      this.courses = this.courses.filter((course: { id: string }) => course.id !== courseId); // Correctly filter by _id
    },
    error => {
      console.error('Error deleting course:', error);
      // Handle specific error messages
      if (error.status === 404) {
        console.error('Course not found');
      } else if (error.status === 500) {
        console.error('Internal Server Error');
      }
    }
  );
}



editCourse(course: any) {
  // Store the original data before editing starts
  course.originalData = { 
    title: course.title, 
    description: course.description, 
    image: course.image, 
    duration: course.duration, 
    lectures: course.lectures, 
    price: course.price 
  };

  // Set isEditing to true so that the inputs are shown for editing
  course.isEditing = true;
}

// Save course
saveCourse(course: any) {
  const formData = new FormData();
  
  // Append the course data
  formData.append('title', course.title);
  formData.append('description', course.description);
  formData.append('duration', course.duration);
  formData.append('lectures', course.lectures);
  formData.append('price', course.price);
  
  // If a new image is selected, append it to FormData
  if (course.selectedFile) {
    formData.append('image', course.selectedFile, course.selectedFile.name); // the second argument is the file's name
  }
  
  // Send the FormData to the backend
  this.courseService.updateCourse(course._id, formData).subscribe(
    (response) => {
      console.log('Course updated successfully:', response);
      course.isEditing = false;  // Exit editing mode
    },
    (error) => {
      console.error('Error updating course:', error);
      alert('Failed to update course. Please try again.');
    }
  );
}

// Cancel editing and restore original data
cancelEdit(course: any) {
  // Restore the original data and exit editing mode
  course.title = course.originalData.title;
  course.description = course.originalData.description;
  course.image = course.originalData.image;
  course.duration = course.originalData.duration;
  course.lectures = course.originalData.lectures;
  course.price = course.originalData.price;

  course.isEditing = false;  // Exit editing mode
}



  // // Handle image change when the user selects a new image
  onImageChange(event: any, course: any): void {
    const file = event.target.files[0];
    if (file) {
      // Store the file in the course object
      course.selectedFile = file;
      
      // Optionally, show a preview of the selected image
      const reader = new FileReader();
      reader.onload = (e: any) => {
        course.imagePreview = e.target.result;  // This holds the image preview URL
      };
      reader.readAsDataURL(file);
    }
  }

}
