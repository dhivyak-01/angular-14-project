import { Component, OnInit, AfterViewInit } from '@angular/core';
import { CourseService } from '../course.service'; 
import { HttpClient } from '@angular/common/http';  // For making HTTP requests
import { Router } from '@angular/router'; 
import { AuthService } from '../auth.service';
import { CartService } from '../cart.service'; 
declare var bootstrap: any;


@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.css']
})
export class CourseComponent implements OnInit, AfterViewInit {

  
  courses: any = { products: [], total: 0, page: 1, limit: 10 };

  isModalOpen: boolean = false;  // Track modal visibility

  constructor(private courseService: CourseService, private cartService: CartService, private authService: AuthService) {}

  ngOnInit(): void {
    this.courseService.getProducts().subscribe(
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
    const modalElement = document.getElementById('orderModal');
    
    if (modalElement) {
      // Initialize the modal with backdrop set to 'false'
      const modal = new bootstrap.Modal(modalElement, {
        backdrop: false // This disables the backdrop
      });
    }
  }

  // onBookNow(course: any): void {
  //   const userId = this.authService.getUserIdFromToken();  // Get the user ID dynamically from the token
  //   console.log('Course:', course);
  //   console.log('Course ID:', course._id); 
  //   // Check if the user is logged in and has a valid user ID
  //   if (!userId) {
  //     console.error('User is not logged in or token is invalid');
  //     return;
  //   }
  //   if (!course._id) {
  //     console.error('Course ID is undefined:', course);
  //     return;
  //   }
  //   // Add course to cart with dynamic user ID
  //   this.cartService.addToCart({
  //     userId: userId,  // Fetch the user ID dynamically
  //     courseId: course._id,
  //     title: course.title,
  //     price: course.price,
  //     description: course.description,
  //     image: course.image,
  //     duration: course.duration,
  //     lectures: course.lectures
  //   });

  //   // console.log('Added course to cart:', course);
  // }


  onBookNow(course: any): void {
    console.log('Course:', course);
    console.log('Course ID:', course._id); 

    if (!course._id) {
      console.error('Course ID is undefined:', course);
      return;
    }

    // Add course to cart without userId
    this.cartService.addToCart({
      courseId: course._id,
      title: course.title,
      price: course.price,
      description: course.description,
      image: course.image,
      duration: course.duration,
      lectures: course.lectures
    });

    console.log('Added course to cart:', course);
  }
}
