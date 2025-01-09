// import { Injectable } from '@angular/core';
// import { Router } from '@angular/router';
// import { AuthService } from './auth.service'; // Import AuthService

// @Injectable({
//   providedIn: 'root'
// })
// export class CartService {

//   private cart: any[] = [];

//   constructor(private router: Router, private authService: AuthService) {}

//   // Method to check if user is logged in using AuthService
//   isUserLoggedIn(): boolean {
//     return this.authService.isLoggedIn();  // Checks if the user is logged in
//   }

//   // Method to add course to cart
//   addToCart(course: any): void {
//     if (this.isUserLoggedIn()) {
//       // Add course to cart if user is logged in
//       this.cart.push(course);
//       console.log('Course added to cart:', course);
//       this.router.navigate(['/cart']);  // Navigate to cart page after adding
//     } else {
//       // If user is not logged in, redirect to login page
//       this.router.navigate(['/login']);
//     }
//   }

//   // Method to get all cart items
//   getCart(): any[] {
//     return this.cart;
//   }
// }



import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private cart: any[] = [];

  constructor(private router: Router) {}

  // Method to add course to cart
  addToCart(course: any): void {
    this.cart.push(course);
    console.log('Course added to cart:', course);
    this.router.navigate(['/cart']);  // Navigate to cart page after adding
  }

  // Method to get all cart items
  getCart(): any[] {
    return this.cart;
  }
}
