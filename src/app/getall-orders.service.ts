import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class GetallOrdersService {

  private apiUrl = 'http://localhost:3000/api/customerorders';  // Update with your backend URL

  constructor(private http: HttpClient) {}

  getOrders(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  // getOrderById(orderId: string): Observable<any> {
  //   return this.http.get(`${this.apiUrl}/${orderId}`);
  // }
}