import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


interface LoginResponse {
  token: string;
  expiresIn: number;
  userId: string;
  role: string;
}

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  private apiUrl = 'http://localhost:3000/admin'; // Ensure this is correct

  constructor(private http: HttpClient) { }

  loginAdmin(username: string, password: string): Observable<any> {
    const body = { username, password };
    return this.http.post(`${this.apiUrl}/login`, body);  // Make sure this is correct
  }

  saveTokenAndAdminId(data: { token: string, adminId: string }) {
    // Store token and admin ID in memory or use localStorage/sessionStorage
    localStorage.setItem('adminToken', data.token);
    localStorage.setItem('adminId', data.adminId);
  }

  // You can also create methods to retrieve the token or adminId, if needed
  getToken() {
    return localStorage.getItem('adminToken');
  }

  getAdminId() {
    return localStorage.getItem('adminId');
  }

  // Optionally, you can create a logout method
  logout() {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminId');
  }
}
