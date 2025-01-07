import { Component, OnInit } from '@angular/core';
import { CourseService } from '../course.service';
import { AuthService } from '../auth.service';
import { CartService } from '../cart.service'; 
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  

  courses: any = { products: [], total: 0, page: 1, limit: 10 };  // 'any' type for simplicity

  constructor(private courseService: CourseService, private cartService: CartService, private authService: AuthService) {}

  ngOnInit(): void {
    this.courseService.getCourses().subscribe(
      (response) => {
        this.courses = response; // Assign response directly to the 'courses' object
        console.log('Fetched courses:', this.courses);  // Log the data to check the structure
      },
      (error) => {
        console.error('Error fetching courses:', error); // Handle any errors
      }
    );
  }

  onBookNow(course: any): void {
    const userId = this.authService.getUserIdFromToken();  // Get the user ID dynamically from the token
    console.log('Course:', course);
    console.log('Course ID:', course._id); 
    // Check if the user is logged in and has a valid user ID
    if (!userId) {
      console.error('User is not logged in or token is invalid');
      return;
    }
    if (!course._id) {
      console.error('Course ID is undefined:', course);
      return;
    }
    // Add course to cart with dynamic user ID
    this.cartService.addToCart({
      userId: userId,  // Fetch the user ID dynamically
      courseId: course._id,
      title: course.title,
      price: course.price,
      description: course.description,
      image: course.image,
      duration: course.duration,
      lectures: course.lectures
    });

    // console.log('Added course to cart:', course);
  }
}
