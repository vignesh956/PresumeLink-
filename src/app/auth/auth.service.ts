import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://3.110.176.221:3080/ps/v1/user'; 
  private baseUrl = 'http://3.110.176.221:3080/ps/v1/employee';
  private email: string = '';
  private phoneNumber: string = '+919347252317';
  constructor(private http:HttpClient) { }
  setEmail(email: string) {
    this.email = email; 
  }
 
  resetPassword(email: string, newPassword: string): Observable<any> {
    const payload = {
      email: email, 
      newPassword: newPassword,
    };
  
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
  
    return this.http.post(`${this.apiUrl}/reset-password`, payload, { headers });
  }
  
  createAccount(email: string, password: string): Observable<any> {
    const payload = {
      email: email,
      password: password,
      roles: ["user"],
      avatar: "name.jpg" 
    };
    

    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    return this.http.post(`${this.apiUrl}/email`, payload, { headers });
  }
  getPhoneNumber(): string {
    return this.phoneNumber;
  }
  sendEmailOtp(email: string, phone: string): Observable<any> {
    
    const userData = localStorage.getItem('userData');

 
    const accessToken = userData ? JSON.parse(userData).accessToken : null;

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${accessToken}`,
      'Content-Type': 'application/json', 
    });

    const body = { email, phone }; 

    return this.http.post(`${this.apiUrl}/send-otp`, body, { headers });
  }

  verifyEmail(email: string, password: string) {
    return this.http.post(`${this.apiUrl}/login`, { email, password });
  }
  setPhoneNumber(phone: string) {
    this.phoneNumber = phone;
  }
  getEmail(): string {
    return this.email;
  }
  sendOtp(data: { phone: string; password: string }): Observable<any> {
    this.setPhoneNumber(data.phone); 
 
    return this.http.post(`${this.apiUrl}/send-otp`, data);
  }
  verifyPhoneNumberWithOtp(otp: string): Observable<any> {
    const payload = {
      phone: this.getPhoneNumber(),  
      code: otp
    };
    return this.http.post(`${this.apiUrl}/verify-otp`, payload);
  }
}
