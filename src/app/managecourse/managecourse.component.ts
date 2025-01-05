
import { Component, OnInit, AfterViewInit } from '@angular/core';
import { CourseService } from '../course.service'; 
declare var bootstrap: any;
@Component({
  selector: 'app-managecourse',
  templateUrl: './managecourse.component.html',
  styleUrls: ['./managecourse.component.css']
})
export class ManagecourseComponent implements OnInit, AfterViewInit {
  courses: any = { products: [], total: 0, page: 1, limit: 10 };
  selectedIds: string[] = []; // Holds selected course IDs
  totalPages: number = 0;     // Total number of pages
  currentPage: number = 1;    // Current active page
  viewedcourse: any = null;

  constructor(private courseService: CourseService) {}

  ngOnInit(): void {
    this.courseService.getCourses().subscribe(
      (response) => {
        this.courses = response;
        console.log('Fetched courses:', this.courses);
      },
      (error) => {
        console.error('Error fetching courses:', error);
      }
    );
    
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
}
