import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Retrieve the token from localStorage (or sessionStorage, depending on your preference)
    const token = localStorage.getItem('token');

    // If a token exists, clone the request and add the Authorization header
    if (token) {
      const cloned = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`, // Add the token in the Authorization header
        },
      });
      return next.handle(cloned); // Pass the cloned request to the next handler
    }

    // If there's no token, just pass the original request
    return next.handle(req);
  }
}
