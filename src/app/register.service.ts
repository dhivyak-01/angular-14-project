import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  private apiUrl = 'http://localhost:3000/api/register';  

  constructor(private http: HttpClient) { }

  
  registerUser(userData: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, userData);
  }


  getAllUsers(): Observable<any> {
    return this.http.get<any>('http://localhost:3000/api/users');
  }

  deleteUserById(userId: string): Observable<any> {
    return this.http.delete<any>(`http://localhost:3000/api/users/${userId}`);
  }

  updateUser(user: any): Observable<any> {
    return this.http.put<any>(`http://localhost:3000/api/users/${user._id}`, user);
}

}
