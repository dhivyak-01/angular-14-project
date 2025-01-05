import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CourseService {

   
  //  private apiUrl = 'http://localhost:3000/api/products';

  //  constructor(private http: HttpClient) { }
 
   
  //  getCourses(): Observable<any[]> {
  //   return this.http.get<any[]>(this.apiUrl).pipe(
  //     tap((data) => console.log('Fetched courses:', data))  
  //   );
  // }
  private apiUrl = 'http://localhost:3000/api/products';  // URL to your courses API

  constructor(private http: HttpClient) {}

  // Method to get all courses
  getCourses(): Observable<any> {
    return this.http.get<any>(this.apiUrl);  // Returns the courses data from your backend
  }

  // deleteCourse(courseId: string): Observable<any> {
  //   return this.http.delete(`${this.apiUrl}/${courseId}`);
  // }

  deleteCourse(courseId: string): Observable<any> {
    return this.http.delete(`http://localhost:3000/api/products/${courseId}`);
  }
}
