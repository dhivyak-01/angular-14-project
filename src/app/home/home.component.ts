import { Component, OnInit } from '@angular/core';
import { CourseService } from '../course.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  // courses = [
  //   {
  //     id: 1,
  //     title: 'Data Science and Machine Learning with Python - Hands On!',
  //     description: 'Learn Data Science and Machine Learning with Python through hands-on projects and exercises.',
  //     image: 'assets/images/courses-01.png',
  //     duration: '08 hr 15 mins',
  //     lectures: 29,
  //     price: 385.00,
  //     bookNowUrl: '/book-now/1'  // You can replace this with your desired link
  //   },
  //   {
  //     id: 2,
  //     title: 'Create Amazing Color Schemes for Your UX Design Projects',
  //     description: 'Master the art of creating beautiful and effective color schemes for UI/UX design projects.',
  //     image: 'assets/images/courses-02.png',
  //     duration: '06 hr 30 mins',
  //     lectures: 25,
  //     price: 420.00,
  //     bookNowUrl: '/book-now/2'
  //   },
  //   {
  //     id: 3,
  //     title: 'Culture & Leadership: Strategies for a Successful Business',
  //     description: 'Learn the strategies and skills needed for successful leadership and business culture.',
  //     image: 'assets/images/courses-03.png',
  //     duration: '10 hr 00 mins',
  //     lectures: 32,
  //     price: 295.00,
  //     bookNowUrl: '/book-now/3'
  //   },
  //   {
  //     "id": 4,
  //     "title": "Finance Series: Learn to Budget and Calculate your Net Worth.",
  //     "description": "Master budgeting skills and learn to calculate your net worth with this finance series.",
  //     "image": "assets/images/courses-04.png",
  //     "duration": "08 hr 15 mins",
  //     "lectures": 29,
  //     "price": 0.00,
  //     "bookNowUrl": "/book-now/1"
  //   },
  //   {
  //     "id": 5,
  //     "title": "Build Brand Into Marketing: Tackling the New Marketing Landscape",
  //     "description": "Learn how to build a brand and master the new marketing landscape with this course.",
  //     "image": "assets/images/courses-05.png",
  //     "duration": "08 hr 15 mins",
  //     "lectures": 29,
  //     "price": 136.00,
  //     "bookNowUrl": "/book-now/2"
  //   },
  //   {
  //     "id": 6,
  //     "title": "Graphic Design: Illustrating Badges and Icons with Geometric Shapes",
  //     "description": "Learn how to create geometric shape-based badges and icons in this graphic design course.",
  //     "image": "assets/images/courses-06.png",
  //     "duration": "08 hr 15 mins",
  //     "lectures": 29,
  //     "price": 237.00,
  //     "bookNowUrl": "/book-now/3"
  //   }
  // ];

  
  // constructor() { }

  // ngOnInit(): void {
  // }




  courses: any = { products: [], total: 0, page: 1, limit: 10 };  // 'any' type for simplicity

  constructor(private courseService: CourseService) {}

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
}
