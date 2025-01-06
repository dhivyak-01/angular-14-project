import { Component, HostListener } from '@angular/core';
import { ActivatedRoute, Router, NavigationStart } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'angular-14-project';
  isSticky: boolean = false;
  

  @HostListener('window:scroll', [])
  onWindowScroll() {
    if (window.scrollY > 0) {
      this.isSticky = true;
    } else {
      this.isSticky = false;
    }
  }

  isAdminPage: boolean = false;  // This flag will decide whether navbar is shown
  isBookingsPage: boolean = false;
  constructor(private router: Router, private activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    // Listen to router events to detect route changes
    this.router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        console.log('Navigation event:', event);
        console.log('Navigating to:', event.url);
        // Hide navbar on the admin login page and any route starting with /adminpanel
        this.isAdminPage = event.url.includes('/adminlogin') || event.url.startsWith('/adminpanel') || event.url.startsWith('/manage') || event.url.startsWith('/add') || event.url.startsWith('/banner') || event.url.startsWith('/adminbookings') || event.url.startsWith('/dashboard') || event.url.startsWith('/admincourse');
        this.isBookingsPage = event.url.includes('/adminbookings');
        console.log('isBookingsPage:', this.isBookingsPage);
      }
    });

  }
}
