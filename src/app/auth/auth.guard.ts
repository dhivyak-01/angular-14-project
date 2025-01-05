import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AdminService } from '../admin.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private adminService: AdminService, private router: Router) {}

  canActivate(): boolean {
    const token = this.adminService.getToken();

    if (!token) {
      // If there is no token, redirect to the login page
      this.router.navigate(['/adminlogin']);
      return false;
    }

    // If there is a token, allow access
    return true;
  }
}
