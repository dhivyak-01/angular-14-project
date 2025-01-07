import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
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

   getBanner(): Observable<any> {
    return this.http.get<any>(this.apiUrl);  // Returns the courses data from your backend
  }




  // getBanner(page: number, limit: number): Observable<any> {
  //   const params = new HttpParams()
  //     .set('page', page.toString())  // Pass the page as a query parameter
  //     .set('limit', limit.toString());  // Pass the limit as a query parameter
  
  //   return this.http.get<any>(this.apiUrl, { params });
  // }


  deleteBanner(bannerId: string): Observable<any> {
    return this.http.delete(`http://localhost:3000/api/banner/${bannerId}`);
  }


  updateBanner(bannerId: string, updatedData: FormData): Observable<any> {
    return this.http.put(`http://localhost:3000/api/banner/${bannerId}`, updatedData);
  }
}
