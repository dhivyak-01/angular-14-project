import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class BennerService {

  private apiUrl = 'http://localhost:3000/api/banner';
 
   constructor(private http: HttpClient) {}
 
   createBanner(productData: FormData): Observable<any> {
     return this.http.post(this.apiUrl, productData);
   }
}
