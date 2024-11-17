import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
// certificate.model.ts
export interface CourseCertificate {
  course_name: string;
  organisation: string;
  start_date: string;
  end_date: string;
  stepIndex: number;
}

@Injectable({
  providedIn: 'root'
})
export class CreateResumeService {
    constructor(private http:HttpClient) { }
    submitAboutMeData(profileData: any): Observable<any> {
      const userData = JSON.parse(localStorage.getItem('userData') || '{}');
      const accessToken = userData.accessToken;
      if (!accessToken ) {
        console.error('No access token or user ID found in local storage');
        return new Observable(observer => observer.error('Unauthorized: Missing token or user_id'));
      }
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
      });

      const body = { ...profileData };  // Assuming the API expects user_id in the request body
     const url = `${environment.basePath}/create`
      // Send the POST request
      return this.http.post(url, body, { headers });
    }

    patchEducationDetails(updatedEducationDetails: any): Observable<any> {
      const userDataString = localStorage.getItem('userData')  
      if (!userDataString) {
        throw new Error('User data is missing in localStorage');
      }
      const userData = JSON.parse(userDataString);
    const id = userData.id;
      const accessToken = userData.accessToken; 
     const headers = new HttpHeaders().set('Authorization', `Bearer ${accessToken}`);
     const url = `${environment.basePath}/${id}/education`;
     return this.http.patch(url, updatedEducationDetails, { headers });
    }
 
    submitObjectiveDetails(objectiveDetails: any): Observable<any> {
      const userDataString = localStorage.getItem('userData');
      if (!userDataString) {
        throw new Error('User data is missing in localStorage');
      }
      const userData = JSON.parse(userDataString);
      const id = userData.id;
      const accessToken = userData.accessToken;
      const headers = new HttpHeaders().set('Authorization', `Bearer ${accessToken}`);
      const url = `${environment.basePath}/${id}/update-presume`;
      return this.http.patch(url, objectiveDetails, { headers });
    }
  
  updateSkillsData(skillsPayload:any): Observable<any> {
    const userDataString = localStorage.getItem('userData');
    if (!userDataString) {
      throw new Error('User data is missing in localStorage');
    }
    const userData = JSON.parse(userDataString);
    const id = userData.id;
    const accessToken = userData.accessToken;
    const headers = new HttpHeaders().set('Authorization', `Bearer ${accessToken}`);
    const url = `${environment.basePath}/${id}/update-presume`;
    return this.http.patch(url, skillsPayload, { headers });
  }
  updateInterestData(intrestPayload:any): Observable<any> {
    console.log(intrestPayload)
    const userDataString = localStorage.getItem('userData');
    if (!userDataString) {
      throw new Error('User data is missing in localStorage');
    }
    const userData = JSON.parse(userDataString);
    const id = userData.id;
    const accessToken = userData.accessToken;
    const headers = new HttpHeaders().set('Authorization', `Bearer ${accessToken}`);
    const url = `${environment.basePath}/${id}/update-presume`;
    return this.http.patch(url, intrestPayload, { headers });
  }



  updateProjects( data: any): Observable<any> {
    console.log("jnhvgjbknlk;")
    const userDataString = localStorage.getItem('userData')  
    if (!userDataString) {
      throw new Error('User data is missing in localStorage');
    }
    const userData = JSON.parse(userDataString);
  const id = userData.id;
    const accessToken = userData.accessToken; 
   const headers = new HttpHeaders().set('Authorization', `Bearer ${accessToken}`);
   const url = `${environment.basePath}/${id}/project`;
   return this.http.patch(url, data, { headers });
  }

  updateExperience(data: any): Observable<any> {
    const userDataString = localStorage.getItem('userData')  
    if (!userDataString) {
      throw new Error('User data is missing in localStorage');
    }
    const userData = JSON.parse(userDataString);
  const id = userData.id;
    const accessToken = userData.accessToken; 
   const headers = new HttpHeaders().set('Authorization', `Bearer ${accessToken}`);
   const url = `${environment.basePath}/${id}/experience`;
   return this.http.patch(url, data, { headers });
  }
  submitSocialData(payload:any){
    const userDataString = localStorage.getItem('userData')  
    if (!userDataString) {
      throw new Error('User data is missing in localStorage');
    }
    const userData = JSON.parse(userDataString);
  const id = userData.id;
    const accessToken = userData.accessToken; 
   const headers = new HttpHeaders().set('Authorization', `Bearer ${accessToken}`);
   const url = `${environment.basePath}/${id}/social`;
   return this.http.patch(url, payload, { headers });
  }
  updateCertificates(certificates: CourseCertificate): Observable<any> {
    console.log(certificates, '///////////////////////')
    const userDataString = localStorage.getItem('userData')  
    if (!userDataString) {
      throw new Error('User data is missing in localStorage');
    }
    const userData = JSON.parse(userDataString);
  const id = userData.id;
    const accessToken = userData.accessToken; 
   const headers = new HttpHeaders().set('Authorization', `Bearer ${accessToken}`);
   const url = `${environment.basePath}/${id}/certificates`;
   return this.http.patch(url, certificates, { headers });
  }
  submitLanguages(payload: any):   Observable<any> {
    const userDataString = localStorage.getItem('userData')  
    if (!userDataString) {
      throw new Error('User data is missing in localStorage');
    }
    const userData = JSON.parse(userDataString);
  const id = userData.id;
    const accessToken = userData.accessToken; 
   const headers = new HttpHeaders().set('Authorization', `Bearer ${accessToken}`);
   const url = `${environment.basePath}/${id}/languages`;
   return this.http.patch(url, payload, { headers });
    }
  handleError:any='jguify'

  getData(): Observable<any> {
    const userDataString = localStorage.getItem('userData')  
      if (!userDataString) {
        throw new Error('User data is missing in localStorage');
      }
      const userData = JSON.parse(userDataString);
    const id = userData.id;
    const apiUrlWithId = `${environment.basePath}/${id}`; // Assuming your API expects the ID as a part of the URL

  return this.http.get<any>(apiUrlWithId).pipe(
    catchError(this.handleError)
  );
  }
}
