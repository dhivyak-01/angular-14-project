import { Component, OnInit } from '@angular/core';
import { CourseService } from '../course.service';
import { AuthService } from '../auth.service';
import { CartService } from '../cart.service'; 
import { BennerService } from '../benner.service';  
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  

  courses: any = { products: [], total: 0, page: 1, limit: 10 };  // 'any' type for simplicity
  banner: any = null; // Banner data
  isBannerVisible: boolean = false;  // Flag to control banner visibility
  errorMessage: string | null = null;


  constructor(private courseService: CourseService, private bennerService: BennerService, private cartService: CartService, private authService: AuthService) {}

  ngOnInit(): void {
    this.courseService.getProducts().subscribe(
      (response) => {
        this.courses = response; // Assign response directly to the 'courses' object
        console.log('Fetched courses:', this.courses);  // Log the data to check the structure
      },
      (error) => {
        console.error('Error fetching courses:', error); // Handle any errors
      }
    );

    
    const bannerId = '677e1b88a734751a26103106';  // You can replace this with dynamic ID if needed
    this.loadBanner(bannerId);
  }



// Method to fetch and display the banner
loadBanner(bannerId: string): void {
  this.bennerService.getBannerById(bannerId).subscribe(
    (banner) => {
      if (banner) {
        this.banner = banner;

        // Check if the banner is enabled
        if (this.banner.isEnabled) {
          this.isBannerVisible = true;
        } else {
          this.isBannerVisible = false;
        }


        this.banner.description = this.modifyDescription(this.banner.description);
      } else {
        this.errorMessage = 'Banner not found or is disabled';
      }
    },
    (error) => {
      console.error('Error fetching banner:', error);
      this.errorMessage = 'Error loading banner';
    }
  );
}


modifyDescription(description: string): string {
  // Wrap "bright career" in <span> tags using your desired CSS class
  return description.replace(
    'bright career', 
    '<span class="highlight">' + 'bright career' + '</span>'
  );
}



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
    name: course.name,
    title: course.title,
    price: course.price,
    description: course.description,
    image: course.image,
    duration: course.duration,
    lectures: course.lectures
  });

  console.log('Added course to cart from :', course);
}
}
