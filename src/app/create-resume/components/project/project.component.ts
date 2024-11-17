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

  constructor(private fb: FormBuilder, private projectService: CreateResumeService, ) {}

  ngOnInit() {
    this.projectsForm = this.fb.group({
      projects: this.fb.array([]),
    });
    this.addProject(); // Add an initial project form
  }

  // Get form array of projects
  get projects(): FormArray {
    return this.projectsForm.get('projects') as FormArray;
  }

  // Add a new project to the form array
  addProject() {
    const projectGroup = this.fb.group({
      project_title: ['', Validators.required],
      role: ['', Validators.required],
      institute: ['', Validators.required],
      start_date: ['', Validators.required],
      end_date: [''],
      currently_working: [false],
    });

    this.projects.push(projectGroup);
  }

  // Method to check if the form is invalid
  get isFormInvalid() {
    return this.projectsForm.invalid || this.projects.controls.some(project => project.invalid);
  }

  // Submit Projects form
  submitProjects() {
    if (this.projectsForm.invalid) {
      console.log('Form is invalid!');
      return;
    }

    const projectsData = this.projectsForm.value.projects;
    const payload = {
      project: projectsData, 
      stepIndex: 4 
    };
    console.log('Form data to submit:', payload);

    this.projectService.updateProjects(payload).subscribe(
      (response) => {
        console.log('Projects submitted successfully:', response);
        // this.router.navigate(['/success']); // Navigate to a success page after submission
      },
      (error) => {
        console.error('Error submitting projects:', error);
      }
    );
  }}
