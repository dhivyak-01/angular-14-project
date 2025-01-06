import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CourseComponent } from './course/course.component';
import { BookingsComponent } from './bookings/bookings.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'; 
import { FormsModule } from '@angular/forms';  
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';  
import { RouterModule } from '@angular/router';  
import { CommonModule } from '@angular/common';
import { AdminloginComponent } from './adminlogin/adminlogin.component';
import { AdminpanelComponent } from './adminpanel/adminpanel.component';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { AdmincourseComponent } from './admincourse/admincourse.component';
import { ManagecourseComponent } from './managecourse/managecourse.component';
import { AddcourseComponent } from './addcourse/addcourse.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { BannerComponent } from './banner/banner.component';
import { AdminbookingsComponent } from './adminbookings/adminbookings.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalComponent } from './modal/modal.component';
import { CartComponent } from './cart/cart.component';
import { ManagebannerComponent } from './managebanner/managebanner.component';
@NgModule({
  declarations: [
    AppComponent,
    CourseComponent,
    BookingsComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    AdminloginComponent,
    AdminpanelComponent,
    AdmincourseComponent,
    ManagecourseComponent,
    AddcourseComponent,
    DashboardComponent,
    BannerComponent,
    AdminbookingsComponent,
    ModalComponent,
    CartComponent,
    ManagebannerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    NgbModule,
    // NgbModal,
    RouterModule,
    CommonModule,
    ReactiveFormsModule,
    NgbModalModule
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true, // Allow multiple interceptors to work together
  },],
  bootstrap: [AppComponent]
})
export class AppModule { }
