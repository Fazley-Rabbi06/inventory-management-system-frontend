import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = 'http://localhost:8080/api'; // Backend URL (Update as needed)

  constructor(private http: HttpClient, private router: Router) { }

  // Login Method
  login(authRequest: { username: string, password: string }): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/authenticate`, authRequest).pipe(
      tap(response => {
        if (response.token) {
          localStorage.setItem('token', `Bearer ${response.token}`); // Store JWT token
          localStorage.setItem('username', authRequest.username); // Optionally, store username
          this.router.navigate(['/home']); // Navigate to home on successful login
        }
      })
    );
  }

  // Signup Method
  signup(userDto: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/user/create`, userDto);
  }

  // Check if User is Logged In
  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  // Logout Method
  logout(): void {
    localStorage.removeItem('token'); // Remove token
    localStorage.removeItem('username'); // Remove username
    this.router.navigate(['/login']); // Navigate to login page
  }
}
