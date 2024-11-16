import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CreateResumeService } from '../../create-resume.service';

@Component({
  selector: 'app-experince',
  templateUrl: './experince.component.html',
  styleUrls: ['./experince.component.scss'],
})
export class ExperinceComponent  implements OnInit {
  experienceForm!: FormGroup;

  constructor(private fb: FormBuilder, private experienceService: CreateResumeService) {}

  ngOnInit() {
    this.initializeForm();
  }

  initializeForm() {
    this.experienceForm = this.fb.group({
      working: [false],
      company_name: ['', Validators.required],
      position: ['', Validators.required],
      location: ['', Validators.required],
      start_date: ['', Validators.required],
      end_date: ['', Validators.required],
      experience_description: [''],
      stepIndex: [7] // Static value as required
    });
  }

  submitExperience() {
    if (this.experienceForm.invalid) {
      return;
    }
    const payload = {
      // project_title: this.experienceForm.get('project_title')?.value,
      experience_description: this.experienceForm.get('experience_description')?.value,
      company_name: this.experienceForm.get('company_name')?.value,
      location: this.experienceForm.get('location')?.value,
      position: this.experienceForm.get('position')?.value,
      start_date: this.experienceForm.get('start_date')?.value,
      end_date: this.experienceForm.get('end_date')?.value,
      working: this.experienceForm.get('working')?.value, // Make sure this is a boolean (true or false)
      stepIndex: 7// You can replace 6 with any dynamic value if necessary
    };

    // const experienceData = this.experienceForm.value;

    this.experienceService.updateExperience(payload).subscribe(
      (response) => {
        console.log('Experience updated successfully', response);
      },
      (error) => {
        console.error('Error updating experience', error);
      }
    );
  }

}
