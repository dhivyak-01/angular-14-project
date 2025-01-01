import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  courses = [
    {
      id: 1,
      title: 'Data Science and Machine Learning with Python - Hands On!',
      description: 'Learn Data Science and Machine Learning with Python through hands-on projects and exercises.',
      image: 'assets/images/courses-01.png',
      duration: '08 hr 15 mins',
      lectures: 29,
      price: 385.00,
      bookNowUrl: '/book-now/1'  // You can replace this with your desired link
    },
    {
      id: 2,
      title: 'Create Amazing Color Schemes for Your UX Design Projects',
      description: 'Master the art of creating beautiful and effective color schemes for UI/UX design projects.',
      image: 'assets/images/courses-02.png',
      duration: '06 hr 30 mins',
      lectures: 25,
      price: 420.00,
      bookNowUrl: '/book-now/2'
    },
    {
      id: 3,
      title: 'Culture & Leadership: Strategies for a Successful Business',
      description: 'Learn the strategies and skills needed for successful leadership and business culture.',
      image: 'assets/images/courses-03.png',
      duration: '10 hr 00 mins',
      lectures: 32,
      price: 295.00,
      bookNowUrl: '/book-now/3'
    },
    // Add more courses as needed
  ];

  
  constructor() { }

  ngOnInit(): void {
  }

}
