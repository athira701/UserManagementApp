import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  AuthResponse,
  LoginCredentials,
  RegisterData,
  User,
} from '../models/user.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:4000/api/auth';

  constructor(private http: HttpClient) {}

  register(userData: RegisterData): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/register`, userData);
  }

  login(credentials: LoginCredentials): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/login`, credentials);
  }

  saveAuthData(token: string, user: any): void {
    localStorage.setItem('token', token);
    localStorage.setItem('userName', user.name);
    localStorage.setItem('userEmail', user.email);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('userName');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('profileImage')
    localStorage.removeItem('userId')
  }

  updateProfile(data: { name?: string; email?: string }): Observable<User> {
    return this.http.put<User>(`${this.apiUrl}/update-profile`, data);
  }

   uploadProfileImage(file: File, email: string): Observable<User>{
        const formData = new FormData()
        formData.append("profileImage", file)
        formData.append("email", email) 
        
        return this.http.post<User>(`${this.apiUrl}/uploadProfileImage`, formData)
    }
}
