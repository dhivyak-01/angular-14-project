import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CourseService {

   
  private apiUrl = 'http://localhost:3000/api/products';  // URL to your courses API

  constructor(private http: HttpClient) {}

  
  getProducts(): Observable<any> {
    return this.http.get<any>(this.apiUrl);  // No query parameters for price filtering
  }

  deleteCourse(courseId: string): Observable<any> {
    return this.http.delete(`http://localhost:3000/api/products/${courseId}`);
  }


  updateCourse(courseId: string, formData: FormData): Observable<any> {
    return this.http.put(`http://localhost:3000/api/products/${courseId}`, formData);
  }
}
