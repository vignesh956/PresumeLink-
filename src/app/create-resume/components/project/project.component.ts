import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CreateResumeService } from '../../create-resume.service';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss'],
})
export class ProjectComponent  implements OnInit {
  projectForm!: FormGroup;
  projectId = ''; // Replace with actual project ID for updating

  constructor(private fb: FormBuilder, private projectService: CreateResumeService) {}

  ngOnInit() {
    // Initialize form with required fields
    this.projectForm = this.fb.group({
      project_title: ['', Validators.required],
      role: ['', Validators.required],
      institute: ['', Validators.required],
      location: ['', Validators.required],
      description: [''],
      start_date: ['', Validators.required],
      end_date: ['', Validators.required],
      currently_working: [false],
      stepIndex:6
    });


  }

 

  // Method to update existing project data
  updateForm() {
    if (this.projectForm.valid) {
      // Construct the payload based on form values
      const payload = {
        project_title: this.projectForm.get('project_title')?.value,
        role: this.projectForm.get('role')?.value,
        institute: this.projectForm.get('institute')?.value,
        location: this.projectForm.get('location')?.value,
        description: this.projectForm.get('description')?.value,
        start_date: this.projectForm.get('start_date')?.value,
        end_date: this.projectForm.get('end_date')?.value,
        currently_working: this.projectForm.get('currently_working')?.value, // Make sure this is a boolean (true or false)
        stepIndex: 6 // You can replace 6 with any dynamic value if necessary
      };
  
      // Call the updateProjects method and pass the payload
      this.projectService.updateProjects(payload).subscribe(
        (response: any) => {
          console.log('Project updated successfully', response);
        },
        (error: any) => {
          console.error('Error updating project', error);
        }
      );
      
    } else {
      // Mark all fields as touched if the form is invalid
      this.projectForm.markAllAsTouched();
    }
  }
  
}
