import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CourseComponent } from './course/course.component';
import { BookingsComponent } from './bookings/bookings.component';
import { CantactComponent } from './cantact/cantact.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'course', component: CourseComponent },
  { path: 'bookings', component: BookingsComponent },
  { path: 'contact', component: CantactComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
