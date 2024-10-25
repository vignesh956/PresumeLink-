import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CreateResumeService {
  public baseUrl = 'http://3.110.176.221:3080/ps/v1/employee';
  // private copyUrl = 'http://43.204.67.249:3080/ps/v1/employee/6703af96d431a73e0fa107c2/objective';
  constructor(private http:HttpClient) { }
  submitSscDetails(employeeId: string, sscDetails: any, token: any): Observable<any> {
    console.log(sscDetails);
  
    const authorization = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${token}`) 
    };
  
    const url = `${this.baseUrl}/${employeeId}/education`;
  
    return this.http.patch(url, sscDetails, authorization);
  }
  

  submitCopyDetails(employeeId: string, copyDetails: any, token: any): Observable<any> {
    const authorizations = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${token}`) 
    };
    
    const url = `${this.baseUrl}/${employeeId}/"objective"`; 

    return this.http.patch(this.baseUrl +'/'+ employeeId + '/objective', copyDetails , authorizations);
  }

  submitworkDetails(employeeId: string, experinceDetails: any, token: any): Observable<any> {
    console.log(experinceDetails);
  
    const authorizationss = {
      headers: new HttpHeaders()
        .set('Authorizationss', `Bearer ${token}`)
    };
  
    const url = `${this.baseUrl}/${employeeId}/experince`;
  
    return this.http.patch(this.baseUrl +'/'+ employeeId + '/experince', experinceDetails, authorizationss);
  }
  
}
