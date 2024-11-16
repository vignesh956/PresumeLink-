import { Component, OnInit } from '@angular/core';
import { CreateResumeService } from '../../create-resume.service';

@Component({
  selector: 'app-social',
  templateUrl: './social.component.html',
  styleUrls: ['./social.component.scss'],
})
export class SocialComponent  implements OnInit {

  constructor(private dataService: CreateResumeService) { }
  data: any = {};
  educationData: any = {}; 
  project:any=[]
  experience:any=[]
  ngOnInit() {
    this.dataService.getData().subscribe({
      next: (response: any) => {
        console.log('Full API Response:', response); // Log the complete response for debugging
  
        // Check if the response structure is as expected
        if (response && response.success && response.result) {
          // Access the main result object
          const result = response.result;
          const user = result.user_id;
          
          // Combine first_name and last_name into a single 'name' field
          const fullName = `${user.first_name || ''} ${user.last_name || ''}`.trim();
          const name = fullName || user.name || 'N/A';
  
          // Extract the required fields from the result and user object
          this.data = {
            address: result.address || '', // If the address is available in the result
            avatar: user.avatar || '',
            birth_date: result.birth_date || '',
            email: result.email || '',
            name: name,
            gender: result.gender || '',
            job_title: result.job_title || '',
            phone: result.phone || '',
            objective: result.objective || '',
            stepIndex: result.stepIndex || 0,
            skills: result.skills || [] // Add the skills array
          };
          
          this.educationData = result.education || {};
          this.project=result.project||{}
          this.experience=result.experience
          console.log('Extracted Data:', this.data);
        } else {
          // Log the response to understand why the structure is unexpected
          console.error('Unexpected response structure:', response);
        }
      },
      error: (error) => {
        console.error('Error fetching data:', error);
      }
    });
  }}
