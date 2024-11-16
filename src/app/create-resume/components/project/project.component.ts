import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { CreateResumeService } from '../../create-resume.service';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss'],
})
export class ProjectComponent  implements OnInit {
  projectsForm!: FormGroup;
  // Used to store multiple projects data

  constructor(private fb: FormBuilder, private projectService: CreateResumeService) {}

  ngOnInit() {
    // Initialize form with a FormArray to hold multiple projects
    this.projectsForm = this.fb.group({
      projects: this.fb.array([this.createProjectForm()]), // Initially, one project form
    });
  }

  // Create a new project form group
  createProjectForm(): FormGroup {
    return this.fb.group({
      project_title: ['', Validators.required],
      role: ['', Validators.required],
      institute: ['', Validators.required],
      location: ['', Validators.required],
      description: [''],
      start_date: ['', Validators.required],
      end_date: ['', Validators.required],
      currently_working: [false],
    });
  }

  // Get the FormArray of projects
  get projects(): FormArray {
    return this.projectsForm.get('projects') as FormArray;
  }

  // Add a new project form to the array
  addProject() {
    this.projects.push(this.createProjectForm());
  }

  // Method to submit all the projects
  submitProjects() {
    if (this.projectsForm.valid) {
      // Prepare the payload from the form values
      const payload = this.projectsForm.value.projects;

      // Call the service to update the projects
      this.projectService.updateProjects(payload).subscribe(
        (response: any) => {
          console.log('Projects updated successfully', response);
        },
        (error: any) => {
          console.error('Error updating projects', error);
        }
      );
    } else {
      // Mark all fields as touched to show validation errors
      this.projectsForm.markAllAsTouched();
    }
  }  
}
