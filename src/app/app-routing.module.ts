import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CourseComponent } from './course/course.component';
import { BookingsComponent } from './bookings/bookings.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AdminloginComponent } from './adminlogin/adminlogin.component';
import { AdminpanelComponent } from './adminpanel/adminpanel.component';
import { AuthGuard } from './auth/auth.guard';
import { AddcourseComponent } from './addcourse/addcourse.component';
import { ManagecourseComponent } from './managecourse/managecourse.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { BannerComponent } from './banner/banner.component';
import { AdminbookingsComponent } from './adminbookings/adminbookings.component';
import { CartComponent } from './cart/cart.component';
import { ManagebannerComponent } from './managebanner/managebanner.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'course', component: CourseComponent },
  { path: 'bookings', component: BookingsComponent },
  { path: 'cart', component: CartComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'adminlogin', component: AdminloginComponent },
  { path: 'adminpanel', component: AdminpanelComponent, canActivate: [AuthGuard] }, // Protect route
  { path: '', redirectTo: '/adminlogin', pathMatch: 'full' },
  { path: 'add', component: AddcourseComponent },
  { path: 'manage', component: ManagecourseComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'banner', component: BannerComponent },
  { path: 'adminbookings', component: AdminbookingsComponent },
  { path: 'managebanner', component: ManagebannerComponent },
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
