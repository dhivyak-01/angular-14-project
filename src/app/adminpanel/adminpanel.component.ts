import { Component, OnInit } from '@angular/core';
import { AdminService } from '../admin.service';
import { Router } from '@angular/router';
import { AddcourseComponent } from '../addcourse/addcourse.component';
import { ManagecourseComponent } from '../managecourse/managecourse.component';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { BannerComponent } from '../banner/banner.component';
import { AdminbookingsComponent } from '../adminbookings/adminbookings.component';
@Component({
  selector: 'app-adminpanel',
  templateUrl: './adminpanel.component.html',
  styleUrls: ['./adminpanel.component.css']
})
export class AdminpanelComponent implements OnInit {

  constructor(private adminService: AdminService, private router: Router) {}

  // Logout method to clear authentication details and navigate to login page
  logout() {
    this.adminService.logout();  // Clear token and adminId
    this.router.navigate(['/adminlogin']);  // Redirect to login page
  }
  navigateTo(route: string): void {
    this.router.navigate([route]);  // Use the Router to navigate to the desired route
  }
  activePage: string = 'Dashboard';
  ngOnInit(): void {
  }

}
