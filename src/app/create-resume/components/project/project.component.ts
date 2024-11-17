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

<<<<<<< HEAD
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
=======
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
>>>>>>> 964a9d466c25b7360321363e3eafc562208fd52d
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
