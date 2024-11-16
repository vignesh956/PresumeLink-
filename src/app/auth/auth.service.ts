import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://3.110.176.221:3080/ps/v1/user'; 
  private email: string = '';
  private phoneNumber: string = '+919347252317';
  constructor(private http:HttpClient) { }
  setEmail(email: string) {
    this.email = email; // Function to set the email when required
  }
  resetPassword(email: string, newPassword: string): Observable<any> {
    const payload = {
      email: email, // Use the email passed as an argument
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
    const payload = {
      email: email,
      phone: phone // Send phone number as well
    };
    return this.http.post(`${this.apiUrl}/send-otp`, payload);
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
  sendOtp(data: { phone: string, password: string }): Observable<any> {
    this.setPhoneNumber(data.phone); // Store phone number for later use
    return this.http.post(`${this.apiUrl}/send-otp`, data);
  }
  verifyPhoneNumberWithOtp(otp: string): Observable<any> {
    const payload = {
      phone: this.getPhoneNumber(),  // Retrieve stored phone number
      code: otp
    };
    return this.http.post(`${this.apiUrl}/verify-otp`, payload);
  }
}
