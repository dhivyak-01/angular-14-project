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
