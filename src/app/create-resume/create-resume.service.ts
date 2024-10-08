import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CreateResumeService {
  private baseUrl = 'http://43.204.67.249:3080/ps/v1/employee';
  constructor(private http:HttpClient) { }
  submitSscDetails(employeeId: string, sscDetails: any, token: any): Observable<any> {
    console.log(sscDetails);
  
    const authorization = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${token}`) // Include the token in the Authorization header
    };
  
    const url = `${this.baseUrl}/${employeeId}/education`;
  
    return this.http.patch(url, sscDetails, authorization);
  }
}
